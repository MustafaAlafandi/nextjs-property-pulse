import { amenityCheckBoxProps } from "@/types/basicTypes";

function AmenityCheckBox({ amenity }: amenityCheckBoxProps) {
  return (
    <div>
      <input
        type="checkbox"
        id={amenity.id}
        name={amenity.name}
        value={amenity.value}
        className="mr-2"
        checked={amenity.isChecked}
        onChange={amenity.changeHandler}    
      />
      <label htmlFor={amenity.id}>{amenity.value}</label>
    </div>
  );
}

export default AmenityCheckBox;
