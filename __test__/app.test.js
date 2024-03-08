const request = require('supertest');
const app = require('@/routes/app');

// Test the root path
// describe('Obtener todos los blogs', function() {
//     it('responds with json', function(done) {
//       request(app)
//         .get('/api/blogs')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     }, 10000);
// });

// describe('Ver blogs', function() {
//   it('responds with json', function() {
//     return request(app)
//       .get('/api/blogs')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .then(response => {
//          console.log(response.body);
//       })
//   });
// });

describe('Blog CRUD', () => {
  let createdBlogId = null;
  it('debería permitir crear un nuevo blog', async () => {
    const newBlog = {
      title: 'New Blog Post',
      content: 'This is a new blog post',
    };

    const response = await request(app)
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .send(newBlog);

    expect(201);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('message', 'Blog created');
    createdBlogId = response.body.id;
  });

  it('debería permitir editar un blog existente', async () => {
      let id = createdBlogId ?? 2;
      const updatedBlog = {
        title: 'Updated Blog Post',
        content: 'This blog post has been updated',
      };

      const response = await request(app)
        .put(`/api/blogs/${id}`)
        .set('Accept', 'application/json')
        .send(updatedBlog);
      expect(200);
      expect(response.body.status).toEqual(true);
      expect(response.body.message).toEqual('Blog updated');
  });

   it('debería permitir obtener un blog por su id', async () => {
      let id = createdBlogId ?? 2;
      const response = await request(app)
        .get(`/api/blogs/${id}`)
        .set('Accept', 'application/json');
      expect(200);
      expect(response.body.status).toEqual(true);
      expect(response.body.data.id).toEqual(id);
  });

  it('debería permitir obtener todos los blogs', async () => {
    const response = await request(app)
      .get('/api/blogs')
      .set('Accept', 'application/json');
    expect(200);
    expect(response.body.status).toEqual(true);
  });

  it('debería permitir eliminar un blog', async () => {
    let id = createdBlogId ?? 2;
    const response = await request(app)
      .delete(`/api/blogs/${id}`)
      .set('Accept', 'application/json');
    expect(200);
    expect(response.body.status).toEqual(true);
  });

});