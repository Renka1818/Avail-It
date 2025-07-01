import React, { useState, useEffect } from 'react';
import { createHospital, updateHospital } from '../services/hospitalService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Bed, MapPin, Phone, Users, Stethoscope } from 'lucide-react';
import { useToast } from '../hooks/use-toast';


const initialState = {
  hospitalName: '',
  totalBeds: 0,
  availableBeds: 0,
  oxygenAvailable: false,
  address: '',
  contactNumber: '',
  icuBeds: 0,
  ventilators: 0
};

function HospitalForm({ editing, onSuccess, onCancel }) {
  const [form, setForm] = useState(initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (editing) {
      const { locations, ...rest } = editing;
      setForm(rest);
    } else setForm(initialState);
  }, [editing]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (checked) => {
    setForm(f => ({
      ...f,
      oxygenAvailable: checked
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const randomLocations = [
      {
        address: '123 Main St',
        city: 'Springfield',
        state: 'CA',
        zipCode: '90001'
      }
    ];
    const payload = { ...form, locations: randomLocations };
    const action = editing ? updateHospital(editing.id, payload) : createHospital(payload);
    action.then(() => {
      onSuccess();
      setForm(initialState);
      toast({
        title: editing ? "Hospital Updated Successfully!" : "Hospital Added Successfully!",
        description: `${form.hospitalName} has been ${editing ? 'updated' : 'added'} to the system.`,
      });
    }).catch(error => {
      toast({
        title: "Error",
        description: "Failed to save hospital. Please try again.",
        variant: "destructive"
      });
    });
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Bed className="h-6 w-6" />
          {editing ? 'Edit Hospital' : 'Register New Hospital'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hospitalName" className="text-gray-700 font-semibold">
                Hospital Name *
              </Label>
              <Input
                id="hospitalName"
                name="hospitalName"
                value={form.hospitalName}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-teal-400 focus:ring-teal-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalBeds" className="text-gray-700 font-semibold">
                Total Beds *
              </Label>
              <Input
                id="totalBeds"
                name="totalBeds"
                type="number"
                value={form.totalBeds}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableBeds" className="text-gray-700 font-semibold">
                Available Beds *
              </Label>
              <Input
                id="availableBeds"
                name="availableBeds"
                type="number"
                value={form.availableBeds}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-green-400 focus:ring-green-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700 font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address *
              </Label>
              <Input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-gray-700 font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Number *
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="icuBeds" className="text-gray-700 font-semibold flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                ICU Beds *
              </Label>
              <Input
                id="icuBeds"
                name="icuBeds"
                type="number"
                value={form.icuBeds}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-red-400 focus:ring-red-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ventilators" className="text-gray-700 font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Ventilators *
              </Label>
              <Input
                id="ventilators"
                name="ventilators"
                type="number"
                value={form.ventilators}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="oxygenAvailable"
              checked={form.oxygenAvailable}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="oxygenAvailable" className="text-gray-700 font-semibold">
              Oxygen Available
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              {editing ? 'Update Hospital' : 'Create Hospital'}
            </Button>
            {editing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default HospitalForm;