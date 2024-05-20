import { Button } from '@/components/ui/button';

const Dropdown = ({ patient }) => {
  return (
    <Button variant="ghost" className="h-max text-left">
      <div>
        <p>HR: {patient.heartrate?.heart_beats || 0} bpm</p>
        <p>SpO2: {patient.oxygen_saturation?.blood_oxygen || 0}</p>
        <p>NIBP: {patient.nibp?.systolic || 0}</p>
        <p>Temp: {patient.temperature?.patient_temp || 0}</p>
      </div>
    </Button>
  );
};
export default Dropdown;
