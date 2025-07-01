const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: 'https://avail-it.vercel.app',
  credentials: true
}));

app.get('/api/delhi-hospitals', async (req, res) => {
  try {
    const { data } = await axios.get('https://dshm.delhi.gov.in/mis/(S(0phtuhcljd0u01xfvsz3cgrg))/Private/frmFreeBedMonitoringReport.aspx', {
      headers: {
        'User-Agent': 'AvailItScraper/1.0 (your@email.com)'
      }
    });
    const $ = cheerio.load(data);
    const hospitals = [];
    $('table.DataGridBody tr[align="center"]').each((i, row) => {
      const cells = $(row).find('td');
      if (cells.length > 0) {
        hospitals.push({
          hospitalId: $(cells[0]).text().trim(),
          name: $(cells[1]).text().trim(),
          totalFreeBed: $(cells[2]).text().trim(),
          totalFreeCriticalBedNoVent: $(cells[3]).text().trim(),
          totalFreeCriticalBedVent: $(cells[4]).text().trim(),
          totalFreeNonCriticalBed: $(cells[5]).text().trim(),
          availableFreeCriticalBedNoVent: $(cells[6]).text().trim(),
          availableFreeCriticalBedVent: $(cells[7]).text().trim(),
          availableFreeNonCriticalBed: $(cells[8]).text().trim(),
          phone: $(cells[9]).text().trim(),
          contactPerson: $(cells[10]).text().trim(),
          contactMobile: $(cells[11]).text().trim(),
          liaisonOfficer: $(cells[12]).text().trim(),
          lastUpdate: $(cells[13]).text().trim(),
        });
      }
    });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hospital data' });
  }
});

app.listen(PORT, () => {
  console.log(`Delhi Hospital Scraper running on port ${PORT}`);
}); 