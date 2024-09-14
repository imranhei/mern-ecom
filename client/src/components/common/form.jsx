import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  SelectItem,
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
} from "../ui/select";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputsByComponentType = (controlItem, index) => {
    let element = null;

    const value = formData[controlItem.name] || "";

    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => {
              setFormData({ ...formData, [controlItem.name]: e.target.value });
            }}
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => {
              setFormData({ ...formData, [controlItem.name]: e.target.value });
            }}
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) => {
              setFormData({ ...formData, [controlItem.name]: value });
            }}
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((option) => {
                    return (
                      <SelectItem key={option.id} value={option.id} >
                        {option.label}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        );
        break;
      default:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => {
              setFormData({ ...formData, [controlItem.name]: e.target.value });
            }}
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem, index) => {
          return (
            <div key={controlItem.name} className="grid w-full gap-1.5">
              <Label className="mb-1">{controlItem.label}</Label>
              {renderInputsByComponentType(controlItem, index)}
            </div>
          );
        })}
      </div>
      <Button
        type="submit"
        className="mt-4 w-full bg-gray-900 rounded text-white hover:bg-gray-950"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
