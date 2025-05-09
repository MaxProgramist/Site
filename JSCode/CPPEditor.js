const input = document.getElementById('editor');

function updateValue(e) {
  alert(e.target.value);
}
input.addEventListener('input', updateValue);