export default function sanitize(e) {
  e.preventDefault();

  if(this.value.length === 1 && typeof this.value === 'string') {
    if(this.value.match(/[a-zA-Z0-9]+/g)) {
      e.target.value = this.value;
    } else {
      e.target.value = "";
    }
  }
}
