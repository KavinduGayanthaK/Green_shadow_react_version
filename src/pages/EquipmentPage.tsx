import { SelectOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Button, Popconfirm, TableColumnsType } from "antd";
import TableComponent from "@/component/table/TableComponent";
import VehicleForm from "@/component/VehicleForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VehicleModel } from "@/models/VehicleModel";
import { deleteVehicle } from "@/reducers/VehicleSlice"; // Ensure this is the correct path
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { EquipmentModel } from "@/models/EquipmentModel";

interface EquipmentDataType {
  key:React.Key;
  equipmentId:string;
  equipmentName:string;
  type:string;
  totalCount:number;
  status:string;
  allocatedFields:string[];
  allocatedStaffMembers:string[]
}

