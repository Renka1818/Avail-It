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
        'User-Agent': 'AvailItScraper/1.0 (renukakakde23@gmail.com)'
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

app.get('/api/location', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { city, format: 'json', limit: 1 },
      headers: {
        'User-Agent': 'AvailItScraper/1.0 (your@email.com)'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch location data' });
  }
});

app.get('/api/bangalore-hospitals', async (req, res) => {
  try {
    const { data } = await axios.get('https://bengaluruurban.nic.in/en/public-utility-category/hospitals/', {
      headers: {
        'User-Agent': 'AvailItScraper/1.0 (renukakakde23@gmail.com)'
      }
    });
    const $ = cheerio.load(data);
    const hospitals = [];
    // Each hospital is in a .elementor-widget-container > div (card)
    $('.elementor-widget-container > div').each((i, el) => {
      const name = $(el).find('b').first().text().trim() || $(el).find('strong').first().text().trim();
      // Get all text nodes, remove name and phone
      let fullText = $(el).text().replace(/\s+/g, ' ').trim();
      let phoneMatch = fullText.match(/Phone\s*:\s*([0-9\-]+)/i);
      let phone = phoneMatch ? phoneMatch[1] : '';
      // Remove name and phone from fullText to get address
      let address = fullText.replace(name, '').replace(/Phone\s*:\s*[0-9\-]+/i, '').trim();
      hospitals.push({ name, address, phone });
    });
    // Filter out empty entries
    const filtered = hospitals.filter(h => h.name && h.phone);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Bangalore hospital data' });
  }
});

app.listen(PORT, () => {
  console.log(`Delhi Hospital Scraper running on port ${PORT}`);
}); 