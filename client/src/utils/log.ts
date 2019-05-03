export function log(message: string) {
  console.log(message);
  const $target = document.querySelector("#MessageBox");
  if ($target) {
    const $p = document.createElement("p");
    $p.textContent = message;
    $target.prepend($p);
  }
}
