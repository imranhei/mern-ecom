import React, { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";
import CommonForm from "@/components/common/form";
import { adddProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  stock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialogue, setOpenCreateProductsDialogue] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialogue(true)}
          className="rounded hover:bg-black bg-gray-800 text-white"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-col-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductsDialogue}
          onOpenChange={() => setOpenCreateProductsDialogue(false)}
        >
          <SheetContent side="right" className="overflow-auto bg-white">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <ProductImageUpload
              file={imageFile}
              setFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                formControls={adddProductFormElements}
                buttonText="Add"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
};

export default AdminProducts;
