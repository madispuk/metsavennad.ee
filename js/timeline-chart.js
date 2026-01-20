/**
 * Timeline chart for displaying forest brothers' periods
 */
window.TimelineChart = {
  estonianMonths: {
    jaanuar: 0,
    veebruar: 1,
    märts: 2,
    aprill: 3,
    mai: 4,
    juuni: 5,
    juuli: 6,
    august: 7,
    september: 8,
    oktoober: 9,
    november: 10,
    detsember: 11,
    kevad: 3,
    suvi: 6,
    sügis: 9,
    talv: 0,
  },

  parseEstonianDate: function (dateStr) {
    if (!dateStr || dateStr === '-' || dateStr === '?') return null;
    dateStr = dateStr.toLowerCase().trim();

    // Format: "10.5.1918" (day.month.year)
    const dotMatch = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (dotMatch) {
      return new Date(
        parseInt(dotMatch[3]),
        parseInt(dotMatch[2]) - 1,
        parseInt(dotMatch[1])
      );
    }

    // Format: "03.2001" (month.year)
    const monthYearMatch = dateStr.match(/^(\d{1,2})\.(\d{4})$/);
    if (monthYearMatch) {
      return new Date(
        parseInt(monthYearMatch[2]),
        parseInt(monthYearMatch[1]) - 1,
        15
      );
    }

    // Format: "märts 1949" (month year)
    for (const [monthName, monthNum] of Object.entries(this.estonianMonths)) {
      if (dateStr.includes(monthName)) {
        const yearMatch = dateStr.match(/(\d{4})/);
        if (yearMatch) {
          return new Date(parseInt(yearMatch[1]), monthNum, 15);
        }
      }
    }

    // Format: "1949" (just year)
    const yearOnly = dateStr.match(/^(\d{4})$/);
    if (yearOnly) {
      return new Date(parseInt(yearOnly[1]), 6, 1);
    }

    return null;
  },

  getEndCauseColor: function (cause) {
    if (!cause) return '#9ca3af';
    cause = cause.toLowerCase();
    if (
      cause.includes('tapetud') ||
      cause.includes('suri') ||
      cause.includes('haavat')
    ) {
      return '#ef4444'; // Red - killed
    }
    if (cause.includes('arreteer')) {
      return '#eab308'; // Yellow - arrested
    }
    if (cause.includes('legaliseer')) {
      return '#4ade80'; // Green - legalized
    }
    return '#9ca3af'; // Grey - other/unknown
  },

  init: function (elementId, peopleData, region) {
    const self = this;

    const chartData = peopleData
      .map((person) => {
        const startDate = self.parseEstonianDate(person.separation_date);
        const endDate = self.parseEstonianDate(person.separation_end_date);
        if (!startDate || !endDate) return null;
        return {
          x: person.name,
          y: [startDate.getTime(), endDate.getTime()],
          fillColor: self.getEndCauseColor(person.separation_end_cause),
          id_name: person.id_name,
          cause: person.separation_end_cause,
        };
      })
      .filter((d) => d !== null)
      .sort((a, b) => a.y[0] - b.y[0]);

    if (chartData.length === 0) {
      document.getElementById(elementId).innerHTML =
        '<p class="text-gray-500">Ajatelje andmed pole saadaval.</p>';
      return;
    }

    const options = {
      series: [{ data: chartData }],
      chart: {
        type: 'rangeBar',
        height: Math.max(400, chartData.length * 28),
        toolbar: { show: false },
        redrawOnParentResize: false,
        redrawOnWindowResize: false,
        animations: { enabled: false },
        zoom: { enabled: false },
        selection: { enabled: false },
        events: {
          dataPointSelection: function (event, chartContext, config) {
            const person = chartData[config.dataPointIndex];
            if (person && person.id_name) {
              window.location.href = '/' + region + '/isik/' + person.id_name + '/';
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '70%',
          rangeBarGroupRows: true,
        },
      },
      xaxis: {
        type: 'datetime',
        position: 'top',
        labels: {
          format: 'yyyy',
        },
        min: new Date('1944-01-01').getTime(),
        max: new Date('1960-01-01').getTime(),
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '14px',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        custom: function ({ seriesIndex, dataPointIndex }) {
          const d = chartData[dataPointIndex];
          const start = new Date(d.y[0]);
          const end = new Date(d.y[1]);
          const duration =
            Math.round(
              ((end - start) / (1000 * 60 * 60 * 24 * 365.25)) * 10
            ) / 10;
          return (
            '<div class="p-2">' +
            '<strong>' +
            d.x +
            '</strong><br>' +
            'Algus: ' +
            start.toLocaleDateString('et-EE') +
            '<br>' +
            'Lõpp: ' +
            end.toLocaleDateString('et-EE') +
            '<br>' +
            'Kestus: ~' +
            duration +
            ' aastat<br>' +
            'Lõpp: ' +
            (d.cause || 'teadmata') +
            '</div>'
          );
        },
      },
      grid: {
        padding: { left: 0, right: 10 },
      },
    };

    const chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render().then(() => {
      // Make y-axis labels clickable and styled as links
      const labels = document.querySelectorAll(
        '#' + elementId + ' .apexcharts-yaxis-label'
      );
      labels.forEach((label, index) => {
        const person = chartData[index];
        if (person && person.id_name) {
          label.style.fill = '#337ab7';
          label.style.cursor = 'pointer';
          label.addEventListener('click', () => {
            window.location.href = '/' + region + '/isik/' + person.id_name + '/';
          });
          label.addEventListener('mouseenter', () => {
            label.style.fill = '#185487';
            label.style.textDecoration = 'underline';
          });
          label.addEventListener('mouseleave', () => {
            label.style.fill = '#337ab7';
            label.style.textDecoration = 'none';
          });
        }
      });
    });
  },
};
