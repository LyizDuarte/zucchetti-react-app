import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsersProvider } from '../contexts/UsersContext';
import { UsersPage } from './UsersPage';

jest.mock('../services/users', () => ({
  fetchUsersApi: jest.fn().mockResolvedValue([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  ]),
}));

describe('UsersPage', () => {
  function renderWithProvider() {
    return render(
      <UsersProvider>
        <UsersPage />
      </UsersProvider>,
    );
  }

  it('renderiza a listagem de usuários', async () => {
    renderWithProvider();

    expect(screen.getByText(/Carregando usuários/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('cria um novo usuário através do formulário', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /novo usuário/i }));

    const nameInput = screen.getByLabelText(/^nome$/i);
    const emailInput = screen.getByLabelText(/e-mail/i);

    await user.type(nameInput, 'Novo Usuário');
    await user.type(emailInput, 'novo@example.com');

    await user.click(screen.getByRole('button', { name: /criar usuário/i }));

    await waitFor(() => {
      expect(screen.getByText('Novo Usuário')).toBeInTheDocument();
      expect(screen.getByText('novo@example.com')).toBeInTheDocument();
    });
  });

  it('edita um usuário existente através do formulário', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const johnRow = screen.getByText('John Doe').closest('tr')!;
    const editButton = within(johnRow).getByRole('button', { name: /editar/i });
    await user.click(editButton);

    const nameInput = screen.getByLabelText(/^nome$/i);
    const emailInput = screen.getByLabelText(/e-mail/i);

    await user.clear(nameInput);
    await user.type(nameInput, 'John Editado');
    await user.clear(emailInput);
    await user.type(emailInput, 'john.editado@example.com');

    await user.click(screen.getByRole('button', { name: /salvar alterações/i }));

    await waitFor(() => {
      expect(screen.getByText('John Editado')).toBeInTheDocument();
      expect(screen.getByText('john.editado@example.com')).toBeInTheDocument();
    });
  });

  it('exclui um usuário após confirmação', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    const janeRow = screen.getByText('Jane Smith').closest('tr')!;
    const deleteButton = within(janeRow).getByRole('button', { name: /excluir/i });
    await user.click(deleteButton);

    expect(
      screen.getByText(/tem certeza que deseja excluir o usuário/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^excluir$/i }));

    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});

