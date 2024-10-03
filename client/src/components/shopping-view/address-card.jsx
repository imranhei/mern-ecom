import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress
}) => {

  const { toast } = useToast();
  return (
    <Card className="">
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="btn btn-sm btn-primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="btn btn-sm btn-danger ml-2"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
