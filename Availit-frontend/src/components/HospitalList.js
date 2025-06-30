import React, { useEffect, useState, useCallback } from 'react';
import { getAllHospitals, deleteHospital } from '../services/hospitalService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Search, MapPin, Phone, Bed, Users, Stethoscope, Edit, Trash2, Activity } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HospitalList({ onEdit, refresh }) {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [showStats, setShowStats] = useState(false);
  const [minBeds, setMinBeds] = useState('');
  const [minVentilators, setMinVentilators] = useState('');
  const [oxygenNeeded, setOxygenNeeded] = useState(false);

  const fetchHospitals = useCallback(() => {
    setLoading(true);
    getAllHospitals({ page: 0, size: 100, sort: 'hospitalName,asc' })
      .then(res => {
        setHospitals(res.data.content);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to fetch hospitals. Please try again.",
          variant: "destructive"
        });
      });
  }, [toast]);

  useEffect(() => {
    fetchHospitals();
  }, [refresh, fetchHospitals]);

  const filtered = hospitals.filter(h =>
    (h.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase())) &&
    (minBeds === '' || h.availableBeds >= parseInt(minBeds)) &&
    (minVentilators === '' || h.ventilators >= parseInt(minVentilators)) &&
    (!oxygenNeeded || h.oxygenAvailable)
  );

  const stats = React.useMemo(() => {
    if (!hospitals.length) return null;
    let totalBeds = 0, availableBeds = 0, icuBeds = 0, ventilators = 0, oxygenHospitals = 0;
    hospitals.forEach(h => {
      totalBeds += h.totalBeds || 0;
      availableBeds += h.availableBeds || 0;
      icuBeds += h.icuBeds || 0;
      ventilators += h.ventilators || 0;
      if (h.oxygenAvailable) oxygenHospitals++;
    });
    return {
      totalHospitals: hospitals.length,
      totalBeds,
      availableBeds,
      icuBeds,
      ventilators,
      oxygenHospitals
    };
  }, [hospitals]);

  const handleDelete = (id, hospitalName) => {
    if (window.confirm(`Are you sure you want to delete ${hospitalName}?`)) {
      deleteHospital(id)
        .then(() => {
          fetchHospitals();
          toast({
            title: "Hospital Deleted",
            description: `${hospitalName} has been removed from the system.`,
          });
        })
        .catch(error => {
          toast({
            title: "Error",
            description: "Failed to delete hospital. Please try again.",
            variant: "destructive"
          });
        });
    }
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            <span className="ml-2 text-gray-600">Loading hospitals...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6" />
          Hospital Availability Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hospitals by name or address..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 transition-colors"
              />
            </div>
            <input
              type="number"
              min="0"
              value={minBeds}
              onChange={e => setMinBeds(e.target.value)}
              placeholder="Min Beds"
              className="w-20 px-2 py-1 border rounded text-xs"
              title="Minimum available beds"
            />
            <input
              type="number"
              min="0"
              value={minVentilators}
              onChange={e => setMinVentilators(e.target.value)}
              placeholder="Min Ventilators"
              className="w-24 px-2 py-1 border rounded text-xs"
              title="Minimum ventilators"
            />
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={oxygenNeeded}
                onChange={e => setOxygenNeeded(e.target.checked)}
              />
              Oxygen Needed
            </label>
            <button
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition text-xs font-semibold"
              onClick={() => setShowStats(s => !s)}
              title="Show statistics for all hospitals"
              type="button"
            >
              {showStats ? 'Hide Statistics' : 'Show Statistics'}
            </button>
          </div>
        </div>
        {showStats && stats && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg flex flex-wrap gap-6 justify-center text-sm font-medium text-blue-900 shadow">
            <div>Total Hospitals: <span className="font-bold">{stats.totalHospitals}</span></div>
            <div>Total Beds: <span className="font-bold">{stats.totalBeds}</span></div>
            <div>Available Beds: <span className="font-bold">{stats.availableBeds}</span></div>
            <div>ICU Beds: <span className="font-bold">{stats.icuBeds}</span></div>
            <div>Ventilators: <span className="font-bold">{stats.ventilators}</span></div>
            <div>Hospitals with Oxygen: <span className="font-bold">{stats.oxygenHospitals}</span></div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {search ? 'No hospitals found' : 'No hospitals registered'}
            </h3>
            <p className="text-gray-500">
              {search ? 'Try adjusting your search terms' : 'Add your first hospital to get started'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filtered.map(hospital => (
              <MuiCard key={hospital.id} className="!rounded-2xl !shadow-lg !mb-6 !border !border-gray-100 hover:!shadow-2xl transition-shadow duration-200">
                <MuiCardContent>
                  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" className="!font-bold !mb-2">{hospital.hospitalName}</Typography>
                      <Box className="flex items-center text-gray-500 mb-2">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{hospital.address}</span>
                        <Phone className="ml-4 mr-2 h-4 w-4" />
                        <span>{hospital.contactNumber}</span>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(hospital)}
                        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(hospital.id, hospital.hospitalName)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="mt-4">
                    <Grid item xs={6} md={3}>
                      <Box className={`bg-yellow-100 rounded-xl p-4 text-center`}>
                        <Bed className="text-yellow-500 mb-1 mx-auto" />
                        <Typography variant="h6" className="!font-bold">{hospital.availableBeds}/{hospital.totalBeds}</Typography>
                        <Typography variant="body2">Beds</Typography>
                        <Typography variant="caption" className="opacity-75 block">{Math.round((hospital.availableBeds / hospital.totalBeds) * 100)}% available</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box className="bg-blue-50 rounded-xl p-4 text-center">
                        <Stethoscope className="text-blue-500 mb-1 mx-auto" />
                        <Typography variant="h6" className="!font-bold">{hospital.icuBeds}</Typography>
                        <Typography variant="body2">ICU Beds</Typography>
                        <Typography variant="caption" className="opacity-75 block">Available</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box className="bg-purple-50 rounded-xl p-4 text-center">
                        <Users className="text-purple-500 mb-1 mx-auto" />
                        <Typography variant="h6" className="!font-bold">{hospital.ventilators}</Typography>
                        <Typography variant="body2">Ventilators</Typography>
                        <Typography variant="caption" className="opacity-75 block">Available</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box className={`${hospital.oxygenAvailable ? 'bg-green-50' : 'bg-red-50'} rounded-xl p-4 text-center`}>
                        <Activity className={`${hospital.oxygenAvailable ? 'text-green-500' : 'text-red-500'} mb-1 mx-auto`} />
                        <Typography variant="h6" className="!font-bold">{hospital.oxygenAvailable ? 'Yes' : 'No'}</Typography>
                        <Typography variant="body2">Oxygen</Typography>
                        <Typography variant="caption" className="opacity-75 block">{hospital.oxygenAvailable ? 'Available' : 'Not Available'}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </MuiCardContent>
              </MuiCard>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default HospitalList; 