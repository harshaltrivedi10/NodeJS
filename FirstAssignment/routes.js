const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(
      '<head> <meta charset="UTF-8"></meta><title>First Assignment</title></head>'
    );
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username" /> <button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(
      '<head><meta charset="UTF-8"></meta><title>First Assignment</title></head>'
    );
    res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    let message = '';
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      message = parsedBody.split('=')[1];

      console.log(message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write(
    '<head><meta charset="UTF-8"></meta><title>First Assignment</title></head>'
  );
  res.write('<body><h1>Nothing found!</h1></body>');
  res.write('</html>');
  return res.end();
};

module.exports = requestHandler;
