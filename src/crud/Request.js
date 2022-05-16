export default class Request {
  static url = 'http://localhost:7070';
  static async add(query) {
    return await Request.send('POST', query);
  }

  static async get() {
    return await Request.send('GET');
  }

  static async delete(id) {
    return await Request.send('DELETE', null, `/${id}`);
  }

  static async send(method, query = null, url = '') {
    const response = await fetch(`${Request.url}/notes${url}`, {
      method: method,
      body: query && JSON.stringify(query),
    });
    return method === 'GET' ? response.json() : true;
  }
}
