(function () {
  const search = document.getElementById("annual-search");
  if (!search) return;
  const rows = Array.from(document.querySelectorAll("[data-annual-row]"));
  const sums = Array.from(document.querySelectorAll("[data-annual-sum]"));
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
  const names = rows.map((row) => normalize(row.dataset.name));
  const headers = Array.from(document.querySelectorAll("[data-sort-column]"));
  const tbody = document.querySelector(".annual-table tbody");
  const collator = new Intl.Collator("pt-BR", { sensitivity: "base", numeric: true });
  let sortColumn = 0;
  let sortDirection = "ascending";

  function sortRows() {
    const direction = sortDirection === "ascending" ? 1 : -1;
    const sorted = [...rows].sort((a, b) => {
      const byName = collator.compare(a.dataset.name, b.dataset.name);
      if (sortColumn === 0) return direction * byName;
      const aValue = a.cells[sortColumn].dataset.count;
      const bValue = b.cells[sortColumn].dataset.count;
      // Meses/anos sem cobertura ficam ao final em ambos os sentidos.
      if (aValue === "" || bValue === "") return aValue === bValue ? byName : aValue === "" ? 1 : -1;
      return direction * (Number(aValue) - Number(bValue)) || byName;
    });
    sorted.forEach(row => tbody.appendChild(row));
    headers.forEach(header => {
      const active = Number(header.dataset.sortColumn) === sortColumn;
      header.setAttribute("aria-sort", active ? sortDirection : "none");
      header.querySelector(".annual-sort-icon").textContent = active ? (sortDirection === "ascending" ? "↑" : "↓") : "↕";
    });
  }

  headers.forEach(header => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "annual-sort-button";
    button.setAttribute("aria-label", "Ordenar por " + header.dataset.sortLabel);
    button.title = "Ordenar por " + header.dataset.sortLabel + "; clique novamente para inverter";
    button.appendChild(document.createTextNode(header.textContent));
    const icon = document.createElement("span");
    icon.className = "annual-sort-icon";
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(icon);
    header.replaceChildren(button);
    button.addEventListener("click", () => {
      const column = Number(header.dataset.sortColumn);
      sortDirection = column === sortColumn ? (sortDirection === "ascending" ? "descending" : "ascending") : column === 0 ? "ascending" : "descending";
      sortColumn = column;
      sortRows();
    });
  });
  sortRows();
  search.addEventListener("input", () => {
    const query = normalize(search.value.trim());
    const totals = sums.map(() => 0);
    let visible = 0;
    rows.forEach((row, index) => {
      row.hidden = !names[index].includes(query);
      if (row.hidden) return;
      visible++;
      row.querySelectorAll("[data-count]").forEach((cell, column) => {
        totals[column] += Number(cell.dataset.count || 0);
      });
    });
    sums.forEach((cell, column) => {
      if (cell.textContent.trim() !== "—") cell.textContent = totals[column];
    });
    document.getElementById("annual-row-count").textContent = `${visible} de ${rows.length} orientadores`;
    document.getElementById("annual-empty").hidden = visible > 0;
  });
  document.getElementById("annual-print").addEventListener("click", () => window.print());
})();
