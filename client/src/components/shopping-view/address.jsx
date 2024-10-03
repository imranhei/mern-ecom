import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (addressList.length > 3 && currentEditedId === null) {
      toast({
        title: "You can only add 4 addresses",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            setCurrentEditedId(null);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id));
              setFormData(initialAddressFormData);
              toast({
                title: "Address added successfully",
              });
            }
          }
        );
  };

  const handleDeleteAddress = (addressInfo) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: addressInfo?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
      }
    });
  };

  const handleEditAddress = (addressInfo) => {
    setCurrentEditedId(addressInfo?._id);
    setFormData({
      ...formData,
      address: addressInfo?.address,
      city: addressInfo?.city,
      phone: addressInfo?.phone,
      pincode: addressInfo?.pincode,
      notes: addressInfo?.notes,
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every((item) => item !== "");
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddress, index) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                key={index}
                addressInfo={singleAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId === null ? "Add New Address" : "Update Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId === null ? "Add" : "Update"}
          onSubmit={handleManageAddress}
          isButtonDisable={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
