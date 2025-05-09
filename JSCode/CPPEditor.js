const input = document.getElementById('editor');

function updateValue(e) {
  console.log(e.target.value);
}
input.addEventListener('input', updateValue);