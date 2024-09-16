import React, { Fragment, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  addNewProduct,
  editProduct,
  deleteProduct,
} from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

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
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data.payload.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductsDialogue(false);
              setFormData(initialFormData);
              setCurrentEditedId(null);
              toast({
                title: "Product Updated Successfully",
                message: "Product has been updated successfully",
                type: "success",
              });
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAllProducts());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateProductsDialogue(false);
            // setUploadedImageUrl("");
            toast({
              title: "Product Added Successfully",
              message: "Product has been added successfully",
              type: "success",
            });
          }
        });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product Deleted Successfully",
          message: "Product has been deleted successfully",
          type: "success",
        });
      }
    });
  };
  const isFormValid = () => {
    return Object
      .keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                key={product._id}
                product={product}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialogue={setOpenCreateProductsDialogue}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialogue}
        onOpenChange={() => {
          setOpenCreateProductsDialogue(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={adddProductFormElements}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              isButtonDisable={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
