/**
 * TodoService
 * create(todo: Todo): Promise<ResponseTodo>
 * get(): Promise<ResponseTodo[]>
 * update(todo: NewTodo, id: TodoId): Promise<ResponseTodo>
 * delete(id: TodoId): Promise<void>
 */

export class TodoService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async create(todo) {
    const response = await this.httpClient.fetchRequest('/todos', {
      method: 'POST',
      body: JSON.stringify({ todo }),
    });

    return response.json();
  }

  async get() {
    const response = await this.httpClient.fetchRequest('/todos');
    return response.json();
  }

  async update(newTodo, id) {
    const response = await this.httpClient.fetchRequest(`/todos/:${id}`, {
      method: 'PUT',
      body: JSON.stringify({ todo: newTodo, isCompleted: false }),
    });

    return response.json();
  }

  async delete(id) {
    await this.httpClient.fetchRequest(`/todos/:${id}`, {
      method: 'DELETE',
    });
  }
}