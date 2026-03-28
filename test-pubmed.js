async function test() {
  const response = await fetch('http://localhost:3000/api/pubmed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'bradycardia dental' })
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
