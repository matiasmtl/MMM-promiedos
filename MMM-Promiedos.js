if (typeof Module === "undefined") {
  window.Module = {
    registeredModules: {},
    register: function(name, module) {
      this.registeredModules[name] = module;
    }
  };
}

Module.register("MMM-Promiedos", {
  defaults: {
    apiUrl: "https://api.promiedos.com.ar/league/tables_and_fixtures/hc",
    animationSpeed: 1000,
    refreshHour: 23,
    refreshMinute: 0
  },

  start: function() {
    this.dataTables = null;
    console.log("Starting module...");
    this.getData();
    this.scheduleUpdate();
  },

  scheduleUpdate: function() {
    let now = new Date();
    let nextUpdate = new Date();

    nextUpdate.setHours(this.config.refreshHour, this.config.refreshMinute, 0, 0);
    if (now >= nextUpdate) {
      nextUpdate.setDate(nextUpdate.getDate() + 1);
    }

    let delay = nextUpdate - now;
    console.log("Next update in " + delay / 1000 + " seconds");
    setTimeout(() => {
      this.getData();
      this.scheduleUpdate();
    }, delay);
  },

  getData: function() {
    let self = this;
    console.log("Fetching data from API...");
    fetch(this.config.apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log("Data received:", data);
        if (data.tables_groups && data.tables_groups[0] && data.tables_groups[0].tables) {
          self.dataTables = data.tables_groups[0].tables.map(table => ({
            name: table.name,
            rows: table.table.rows.map(row => ({
              team: row.entity.object.name,
              teamId: row.entity.object.id,  // Add teamId extraction
              values: row.values.reduce((acc, val) => {
                acc[val.key] = val.value;
                return acc;
              }, {})
            }))
          }));
        } else {
          self.dataTables = [];
          console.error("Unexpected API structure:", data);
        }
        self.updateDom(self.config.animationSpeed);
      })
      .catch(error => {
        console.error("Error fetching Promiedos data:", error);
      });
  },

  getStyles: function() {
    return ["MMM-Promiedos.css"];
  },

  getDom: function() {
    let wrapper = document.createElement("div");
    wrapper.className = "MMM-Promiedos";
    
    if (!this.dataTables) {
      wrapper.innerHTML = "Loading data...";
      return wrapper;
    }

    this.dataTables.forEach((table) => {
      let tableEl = document.createElement("div");
      tableEl.className = "promiedos-table";

      // Add table name
      let titleEl = document.createElement("h2");
      titleEl.textContent = table.name;
      tableEl.appendChild(titleEl);

      // Create actual table element
      let htmlTable = document.createElement("table");

      // Create header row
      let headerRow = document.createElement("tr");
      headerRow.innerHTML = `
        <th></th>
        <th>Equipo</th>
        <th>PTS</th>
        <th>J</th>
        <th>G</th>
        <th>E</th>
        <th>P</th>
        <th>GF:GC</th>
        <th>DIF</th>
      `;
      htmlTable.appendChild(headerRow);

      // Add data rows
      table.rows.forEach((row) => {
        let tr = document.createElement("tr");
        const teamImageUrl = `https://api.promiedos.com.ar/images/team/${row.teamId}/1`;
        tr.innerHTML = `
          <td><img src="${teamImageUrl}" alt="${row.team}"></td>
          <td>${row.team}</td>
          <td>${row.values.Points || 0}</td>
          <td>${row.values.GamePlayed || 0}</td>
          <td>${row.values.GamesWon || 0}</td>
          <td>${row.values.GamesEven || 0}</td>
          <td>${row.values.GamesLost || 0}</td>
          <td>${row.values.Goals || "0:0"}</td>
          <td>${row.values.Ratio || 0}</td>
        `;
        htmlTable.appendChild(tr);
      });

      tableEl.appendChild(htmlTable);
      wrapper.appendChild(tableEl);
    });

    return wrapper;
  }
});