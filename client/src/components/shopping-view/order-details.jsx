import React from 'react'
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = () => {
  return (
    <DialogContent className="sm:max-w[600px]">
      <div className="grod gap-6">
        <div className="grid gap-2 mt-6">
          <div className="flex items-center justify-between">
            <p className="font-medium">Oder ID</p>
            <Label>adadwaad</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Oder Date</p>
            <Label>12/05/2024</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Oder Status</p>
            <Label>In Process</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Oder Price</p>
            <Label>$500</Label>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span>Product one</span>
                  <span>$100</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0-5 text-muted-foreground">
                <span>Johb Doe</span>
                <span>Address</span>
                <span>City</span>
                <span>Pincode</span>
                <span>Phone</span>
                <span>Notes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default ShoppingOrderDetailsView;
