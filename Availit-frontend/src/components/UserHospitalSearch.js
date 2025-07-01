import React, { useEffect, useState, useRef } from 'react';
import { getHospitalsByCity, getUserCity, updateUserCity, getAllCities, getDelhiHospitalsLive } from '../services/hospitalService';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Search, MapPin, Phone, Bed, Users, Stethoscope, Activity } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ReactDOM from 'react-dom';
import { useToast } from '../hooks/use-toast';

const LIVE_DATA_SOURCES = {
  delhi: {
    fetch: getDelhiHospitalsLive,
    label: 'Delhi',
  },
};

function UserHospitalSearch({ showLiveDataToast }) {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [cityPrompt, setCityPrompt] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const username = localStorage.getItem('username') || sessionStorage.getItem('username');
  const [allCities, setAllCities] = useState([]);
  const [changingCity, setChangingCity] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [minBeds, setMinBeds] = useState('');
  const [minVentilators, setMinVentilators] = useState('');
  const [oxygenNeeded, setOxygenNeeded] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const cityInputRef = useRef();
  const [recentCities, setRecentCities] = useState([]);
  const [popularCities, setPopularCities] = useState(["Pune", "Mumbai", "Delhi"]);
  const [geoCity, setGeoCity] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [cityCoords, setCityCoords] = useState(null);
  const [coordsLoading, setCoordsLoading] = useState(false);
  const [coordsError, setCoordsError] = useState(null);
  const [pendingCity, setPendingCity] = useState(null);
  const [showCityConfirm, setShowCityConfirm] = useState(false);
  const { toast } = useToast();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (!username) return;
    getUserCity(username).then(res => {
      if (res && res.city) {
        setCity(res.city);
        fetchHospitals(res.city);
      } else {
        setCity('');
        setCityPrompt(true);
        setLoading(false);
        fetchHospitals('');
      }
    }).catch(() => {
      setCity('');
      setCityPrompt(true);
      setLoading(false);
      fetchHospitals('');
    });
    getAllCities().then(setAllCities);
    const stored = localStorage.getItem('recentCities');
    if (stored) setRecentCities(JSON.parse(stored));
  }, [username]);

  useEffect(() => {
    if (showLiveDataToast) {
      toast({
        title: 'Live Data Available!',
        description: 'Live hospital data is available for Delhi. Switch to Delhi city to see real-time updates.',
        duration: 2000,
      });
    }
  }, [showLiveDataToast, toast]);

  const fetchHospitals = (cityName) => {
    setLoading(true);
    setError(null);
    if (!cityName || cityName.trim() === '') {
      setError('Please select a city to view hospital data.');
      setLoading(false);
      return;
    }
    const cityKey = cityName.trim().toLowerCase();
    if (LIVE_DATA_SOURCES[cityKey]) {
      LIVE_DATA_SOURCES[cityKey].fetch().then(data => {

        const mapped = Array.isArray(data)
          ? data.map(h => ({
              hospitalName: h.hospitalName || h.name || '',
              address: h.address || h.location || '',
              availableBeds: h.availableBeds || h.bedsAvailable || h.available_beds || 0,
              totalBeds: h.totalBeds || h.bedsTotal || h.total_beds || 0,
              icuBeds: h.icuBeds || h.icu || h.icu_beds || 0,
              ventilators: h.ventilators || h.ventilator || h.ventilators_available || 0,
              oxygenAvailable: h.oxygenAvailable || h.oxygen || h.oxygen_available || false,
              contactNumber: h.contactNumber || h.phone || h.contact || '',
              ...h
            }))
          : [];
        setHospitals(mapped);
        setLoading(false);
      }).catch(() => {
        setError(`Failed to load live ${cityName} hospital data`);
        setLoading(false);
      });
    } else {
      getHospitalsByCity(cityName).then(data => {
        setHospitals(Array.isArray(data) ? data : []);
        setLoading(false);
      }).catch(() => {
        setError('Failed to load hospitals');
        setLoading(false);
      });
    }
  };

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    if (!cityInput) return;
    setLoading(true);
    await updateUserCity(username, cityInput);
    setCity(cityInput);
    setCityPrompt(false);
    fetchHospitals(cityInput);
  };

  const handleCityChange = async (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    setChangingCity(false);
    setLoading(true);
    await updateUserCity(username, newCity);
    fetchHospitals(newCity);
  };

  const handleCityInput = (e) => {
    setCityQuery(e.target.value);
    setShowCitySuggestions(true);
  };

 
  const hasUnsavedWorkOrFilters = () => {
    return search.trim() !== '';

  };


  const handleCitySelect = async (selectedCity) => {
    if (hasUnsavedWorkOrFilters()) {
      setPendingCity(selectedCity);
      setShowCityConfirm(true);
      return;
    }
    await doCityChange(selectedCity);
  };


  const doCityChange = async (selectedCity) => {
    setCity(selectedCity);
    setCityQuery(selectedCity);
    setShowCitySuggestions(false);
    setChangingCity(false);
    setLoading(true);
    let updatedRecent = [selectedCity, ...recentCities.filter(c => c !== selectedCity)].slice(0, 5);
    setRecentCities(updatedRecent);
    localStorage.setItem('recentCities', JSON.stringify(updatedRecent));
    await updateUserCity(username, selectedCity);
    fetchHospitals(selectedCity);
    setShowCityConfirm(false);
    setPendingCity(null);
  };


  const handleCityConfirm = (confirm) => {
    if (confirm && pendingCity) {
      doCityChange(pendingCity);
    } else {
      setShowCityConfirm(false);
      setPendingCity(null);
    }
  };

  useEffect(() => {
    if (changingCity) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await res.json();
            const cityName = data.address.city || data.address.town || data.address.village || data.address.state_district || data.address.state;
            if (cityName) setGeoCity(cityName);
          } catch (e) {
            setGeoError('Could not determine city from location.');
          }
        }, (err) => {
          setGeoError('Location access denied.');
        });
      } else {
        setGeoError('Geolocation not supported.');
      }
    } else {
      setGeoCity(null);
      setGeoError(null);
    }
  }, [changingCity]);
  useEffect(() => {
    if (!city) {
      setCityCoords(null);
      return;
    }
    setCoordsLoading(true);
    setCoordsError(null);
    fetch(`${process.env.REACT_APP_SCRAPPER_URL}/api/location?city=${encodeURIComponent(city)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCityCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
        } else {
          setCityCoords(null);
          setCoordsError('Could not find city location.');
        }
        setCoordsLoading(false);
      })
      .catch(() => {
        setCityCoords(null);
        setCoordsError('Could not fetch city location.');
        setCoordsLoading(false);
      });
  }, [city]);

  const filtered = hospitals.filter(h =>
    (h.hospitalName && h.hospitalName.toLowerCase().includes(search.toLowerCase())) ||
    (h.address && h.address.toLowerCase().includes(search.toLowerCase()))
  );

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage >= 50) return 'text-green-600 bg-green-100';
    if (percentage >= 25) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

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

  function RecenterMap({ lat, lon }) {
    const map = useMap();
    useEffect(() => {
      if (lat && lon && map) {
        map.setView([lat, lon], 12);
      }
    }, [lat, lon, map]);
    return null;
  }

  function CitySuggestionsPortal({ show, cityQuery, allCities, handleCitySelect, setCityQuery, setShowCitySuggestions, inputRef }) {
    if (!show || !cityQuery) return null;
    const rect = inputRef.current?.getBoundingClientRect();
    const suggestions = allCities.filter(c => c.toLowerCase().includes(cityQuery.toLowerCase()));
    const fallbackTop = 100;
    const fallbackLeft = 100;
    const fallbackWidth = 200;
    return ReactDOM.createPortal(
      <ul
        style={{
          position: 'absolute',
          left: rect ? rect.left : fallbackLeft,
          top: rect ? rect.bottom + window.scrollY : fallbackTop,
          width: rect ? rect.width : fallbackWidth,
          zIndex: 9999,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          marginTop: 4,
          maxHeight: 160,
          overflowY: 'auto',
          boxShadow: '0 2px 12px #0001',
        }}
      >
        {suggestions.length === 0 ? (
          <li className="px-3 py-2 text-gray-500">No cities found</li>
        ) : (
          suggestions.map(c => (
            <li
              key={c}
              className="px-3 py-2 hover:bg-indigo-100 cursor-pointer text-base"
              onMouseDown={() => {
                handleCitySelect(c);
                setCityQuery('');
                setShowCitySuggestions(false);
              }}
            >
              {c}
            </li>
          ))
        )}
      </ul>,
      document.body
    );
  }


  const isLiveCity = LIVE_DATA_SOURCES[city.trim().toLowerCase()] !== undefined;

  if (cityPrompt) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <form onSubmit={handleCitySubmit} className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Enter your city to see nearby hospitals</h3>
            <Input
              placeholder="Enter city name..."
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              className="border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 transition-colors"
              required
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition">
              See Hospitals
            </button>
          </form>
        </CardContent>
      </Card>
    );
  }

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

  if (error) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Hospitals</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Persistent live data banner if city is not Delhi */}
      {city && city.trim().toLowerCase() !== 'delhi' && showBanner && (
        <div className="fixed top-4 right-4 z-[110] animate-pulse bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <svg className="h-6 w-6 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" />
            <path stroke="#fff" strokeWidth="2" d="M8 12l2 2 4-4" />
          </svg>
          <span className="font-semibold">Live data is available for <span className="underline">Delhi</span>! Switch to Delhi city for real-time hospital info.</span>
          <button
            onClick={() => setShowBanner(false)}
            className="ml-2 text-green-700 hover:text-white hover:bg-green-500 focus:bg-green-600 focus:text-white text-2xl font-extrabold rounded-full w-9 h-9 flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-150"
            aria-label="Close live data banner"
          >
            &times;
          </button>
        </div>
      )}
      {/* City Change Confirmation Dialog (always overlays UI) */}
      {showCityConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs text-center">
            <h3 className="text-lg font-semibold mb-2">Change City?</h3>
            <p className="text-gray-700 mb-4">You have unsaved work or filters applied. Are you sure you want to change the city? This will clear your current search/filter.</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                onClick={() => handleCityConfirm(true)}
              >
                Yes, Change
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-semibold"
                onClick={() => handleCityConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg flex items-center gap-3">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Hospital Availability Search
            {isLiveCity && (
              <span className="ml-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold shadow-sm border border-green-200 flex items-center gap-1">
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" />
                  <path stroke="#fff" strokeWidth="2" d="M8 12l2 2 4-4" />
                </svg>
                Live Data
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4 w-full">
            {/* City selector and change button */}
            <div className="w-full md:w-auto flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-semibold text-gray-700 text-base md:text-lg">City:</span>
                {!changingCity && (
                  <>
                    <span className="text-indigo-700 font-bold text-base md:text-lg">{city}</span>
                    <button
                      className="ml-2 px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow transition flex items-center gap-1"
                      onClick={() => {
                        setChangingCity(true);
                        setCityQuery('');
                        setTimeout(() => cityInputRef.current && cityInputRef.current.focus(), 100);
                      }}
                    >
                      {/* Location icon (Lucide/Feather SVG) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                      </svg>
                      Change City
                    </button>
                  </>
                )}
              </div>
              {changingCity && (
                <div className="relative w-full md:w-64 z-40">
                  {/* Popular Cities */}
                  {popularCities.length > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500 font-medium min-w-fit">Popular:</span>
                      {popularCities.map(pc => (
                        <button
                          key={pc}
                          type="button"
                          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-xs font-semibold shadow-sm border border-green-200 transition-all duration-150"
                          onMouseDown={() => handleCitySelect(pc)}
                        >
                          {pc}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Recent Cities */}
                  {recentCities.length > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500 font-medium min-w-fit">Recent:</span>
                      {recentCities.map(rc => (
                        <button
                          key={rc}
                          type="button"
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-xs font-semibold shadow-sm border border-blue-200 transition-all duration-150"
                          onMouseDown={() => handleCitySelect(rc)}
                        >
                          {rc}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Geolocation Suggestion */}
                  {geoCity && (
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium min-w-fit">Nearby:</span>
                      <button
                        type="button"
                        className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full text-xs font-semibold shadow-sm border border-yellow-200 transition-all duration-150"
                        onMouseDown={() => handleCitySelect(geoCity)}
                      >
                        {geoCity} (suggested)
                      </button>
                    </div>
                  )}
                  {geoError && (
                    <div className="mb-2 text-xs text-red-500">{geoError}</div>
                  )}
                  {/* City Search Input */}
                  <input
                    ref={cityInputRef}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                    placeholder="Type to search city..."
                    value={cityQuery}
                    onChange={handleCityInput}
                    onFocus={() => setShowCitySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                    autoFocus
                  />
                  <CitySuggestionsPortal
                    show={showCitySuggestions && cityQuery}
                    cityQuery={cityQuery}
                    allCities={allCities}
                    handleCitySelect={handleCitySelect}
                    setCityQuery={setCityQuery}
                    setShowCitySuggestions={setShowCitySuggestions}
                    inputRef={cityInputRef}
                  />
                </div>
              )}
            </div>
            {/* Search bar */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hospitals by name or address..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 transition-colors text-base font-medium w-full"
              />
            </div>
          </div>

          {/* Map display for selected city */}
          <div className="mb-6 w-full">
            {coordsLoading && (
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></span>
                Loading map for {city}...
              </div>
            )}
            {coordsError && (
              <div className="text-red-500 text-sm mb-2">{coordsError}</div>
            )}
            {cityCoords && (
              <MapContainer
                center={[cityCoords.lat, cityCoords.lon]}
                zoom={12}
                style={{ height: '250px', width: '100%', borderRadius: '12px', boxShadow: '0 2px 12px #0001' }}
                scrollWheelZoom={false}
              >
                <RecenterMap lat={cityCoords.lat} lon={cityCoords.lon} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[cityCoords.lat, cityCoords.lon]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
                  <Popup>
                    {city}
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>

          {/* Statistics toggle and bar for selected city */}
          <div className="mb-4 flex items-center justify-end w-full">
            <button
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition text-xs font-semibold"
              onClick={() => setShowStats(s => !s)}
              title="Show statistics for this city"
              type="button"
            >
              {showStats ? 'Hide Statistics' : 'Show Statistics'}
            </button>
          </div>
          {showStats && stats && (
            <div className="mb-6 w-full overflow-x-auto">
              <div className="flex gap-4 md:grid md:grid-cols-6 md:gap-6 animate-fade-in">
                <div className="min-w-[160px] bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
                  <Activity className="h-7 w-7 mb-1 animate-pulse" />
                  <span className="text-3xl font-extrabold tracking-tight drop-shadow-lg">{stats.totalHospitals}</span>
                  <span className="text-base font-semibold mt-1">Hospitals</span>
                </div>
                <div className="min-w-[160px] bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
                  <Bed className="h-7 w-7 mb-1 animate-bounce" />
                  <span className="text-3xl font-extrabold tracking-tight">{stats.totalBeds}</span>
                  <span className="text-base font-semibold mt-1">Total Beds</span>
                </div>
                <div className="min-w-[160px] bg-gradient-to-br from-green-300 to-green-500 text-green-900 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
                  <Bed className="h-7 w-7 mb-1 animate-bounce" />
                  <span className="text-3xl font-extrabold tracking-tight">{stats.availableBeds}</span>
                  <span className="text-base font-semibold mt-1">Available Beds</span>
                </div>
                <div className="min-w-[160px] bg-gradient-to-br from-blue-200 to-blue-400 text-blue-900 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
                  <Stethoscope className="h-7 w-7 mb-1 animate-bounce" />
                  <span className="text-3xl font-extrabold tracking-tight">{stats.icuBeds}</span>
                  <span className="text-base font-semibold mt-1">ICU Beds</span>
                </div>
                <div className="min-w-[160px] bg-gradient-to-br from-purple-300 to-purple-500 text-purple-900 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
                  <Users className="h-7 w-7 mb-1 animate-bounce" />
                  <span className="text-3xl font-extrabold tracking-tight">{stats.ventilators}</span>
                  <span className="text-base font-semibold mt-1">Ventilators</span>
                </div>
                <div className={`min-w-[160px] ${stats.oxygenHospitals > 0 ? 'bg-gradient-to-br from-green-400 to-green-600 text-green-900' : 'bg-gradient-to-br from-red-300 to-red-500 text-red-900'} rounded-xl shadow-lg p-4 flex flex-col items-center justify-center`}>
                  <Activity className={`h-7 w-7 mb-1 ${stats.oxygenHospitals > 0 ? 'animate-pulse' : ''}`} />
                  <span className="text-3xl font-extrabold tracking-tight">{stats.oxygenHospitals}</span>
                  <span className="text-base font-semibold mt-1">Hospitals with Oxygen</span>
                </div>
              </div>
              <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
                .animate-fade-in { animation: fade-in 0.7s cubic-bezier(0.77,0,0.175,1) both; }
              `}</style>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {search ? 'No hospitals found' : 'No hospitals available'}
              </h3>
              <p className="text-gray-500">
                {search ? 'Try adjusting your search terms' : 'No hospitals are currently available.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map(hospital => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-200 hover:border-indigo-300"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            {hospital.hospitalName || hospital.name}
                          </h3>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{hospital.address || hospital.name || ''}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              <span>{hospital.contactNumber}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                        <div className={`text-center p-3 rounded-lg ${getAvailabilityColor(hospital.availableBeds, hospital.totalBeds)}`}>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Bed className="h-4 w-4" />
                            <span className="font-semibold">Beds</span>
                          </div>
                          <div className="text-lg font-bold">
                            {hospital.availableBeds}/{hospital.totalBeds}
                          </div>
                          <div className="text-xs opacity-75">
                            {hospital.totalBeds > 0
                              ? `${Math.round((hospital.availableBeds / hospital.totalBeds) * 100)}% available`
                              : 'Not available'}
                          </div>
                        </div>

                        <div className="text-center p-3 rounded-lg bg-blue-50 text-blue-600">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Stethoscope className="h-4 w-4" />
                            <span className="font-semibold">ICU Beds</span>
                          </div>
                          <div className="text-lg font-bold">{hospital.icuBeds}</div>
                          <div className="text-xs opacity-75">Available</div>
                        </div>

                        <div className="text-center p-3 rounded-lg bg-purple-50 text-purple-600">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="h-4 w-4" />
                            <span className="font-semibold">Ventilators</span>
                          </div>
                          <div className="text-lg font-bold">{hospital.ventilators}</div>
                          <div className="text-xs opacity-75">Available</div>
                        </div>

                        <div className={`text-center p-3 rounded-lg ${hospital.oxygenAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Activity className="h-4 w-4" />
                            <span className="font-semibold">Oxygen</span>
                          </div>
                          <div className="text-lg font-bold">
                            {hospital.oxygenAvailable ? 'Yes' : 'No'}
                          </div>
                          <div className="text-xs opacity-75">
                            {hospital.oxygenAvailable ? 'Available' : 'Not Available'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default UserHospitalSearch; 