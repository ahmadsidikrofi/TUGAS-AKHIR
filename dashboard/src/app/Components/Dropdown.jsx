import { Button } from '@/components/ui/button';

const Dropdown = ({ patient }) => {
  return (
    <Button variant="ghost" className="h-max text-left">
      <div>
        <p>HR: {patient.heartrate.heart_beats} bpm</p>
        <p>SpO2: {patient.oxygen_saturation.blood_oxygen}</p>
        <p>NIBP: {patient.nibp.systolic}</p>
      </div>
    </Button>
  );
};
export default Dropdown;
