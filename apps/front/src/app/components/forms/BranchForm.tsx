import { useEffect, useRef } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { CreateBranchVariables, Branch } from "@requests/branch";
import {
  isStringEmpty,
  validateEmail,
  validatePassword,
} from "@utils/validation";
import hiddenPassword from "../../assets/svg/password.svg";
import home from "../../assets/svg/homeOrange.svg";
import address from "../../assets/svg/addressOrange.svg";
import { FormikProps, Formik, Form, useFormik } from "formik";
import { useCompanies } from "@requests/company";
import { useZones } from "@requests/zone";
import { useFranchises } from "@requests/franchise";
import Select from "@components/inputs/Select";

export interface BranchFormProps {
  onSubmit: (values: CreateBranchVariables) => void;
  item?: Branch;
  onClose: () => void;
}

interface FormProps {
  name: string;
  description: string;
  openAt: string;
  company: string;
  closeAt: string;
  status: boolean;
  franchise: string;
  zone: string;
}
const BranchForm = ({ onSubmit, item, onClose }: BranchFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);
  const { data: compnayData } = useCompanies();
  const { data: zoneData } = useZones();
  const { data: FranchiseData } = useFranchises();
  const franchises = FranchiseData?.findAllFranchises.data;
  const Companies = compnayData?.findAllCompanys.data;
  const zones = zoneData?.findAllZones.data;
  const CompaniesOptions = Companies
    ? Companies?.map((company) => ({
        name: company.name,
        value: company.id,
      }))
    : [];

  const zonesOptions = zones
    ? zones?.map((zone) => ({
        name: zone.name,
        value: zone.id,
      }))
    : [];
  const franchisesOptions = franchises
    ? franchises?.map((franchise) => ({
        name: franchise.name,
        value: franchise.id,
      }))
    : [];
  const validate = (values: FormProps) => {
    const errors = {} as FormProps;
    if (isStringEmpty(values.name)) errors.name = " Name is required";
    if (isStringEmpty(values.description))
      errors.description = "description is required";
    if (isStringEmpty(values.openAt)) errors.openAt = "openAt is required";
    if (isStringEmpty(values.closeAt)) errors.closeAt = "closeAt is required";
    if (isStringEmpty(values.company)) errors.company = "company is required";

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      openAt: "",
      company: "",
      franchise: "",
      zone: "",
      closeAt: "",
      status: true,
    },

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //     console.log(values);
    onSubmit: (values: FormProps) => {
      onSubmit({
        name: values.name,
        description: values.description,
        company: values.company,
        openAt: values.openAt,
        closeAt: values.closeAt,
        status: values.status,
        franchise: values.franchise,
        zone: values.zone,
      });
    },
  });
  //   } else {
  //     setAllTouched(true);
  //   }
  // };

  useEffect(() => {
    if (item) {
      if (formik) {
        formik.setValues({
          name: item.name,
          description: item.description,
          company: item.company.id,
          openAt: item.openAt,
          closeAt: item.closeAt,
          status: item.status,
          franchise: item.franchise.id,
          zone: item.zone.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <form
      className="flex flex-col gap-5 item-center m-8 bg-white"
      onSubmit={formik.handleSubmit}
    >
      <button
        onClick={onClose}
        className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>

      <Input
        value={formik.values.name}
        label="name"
        name="name"
        placeholder="name"
        required
        icon={hiddenPassword}
        onChange={formik.handleChange}
        errorText={formik.errors.name /*&& touched.name*/}
      />
      <Input
        value={formik.values.description}
        label="description"
        name="description"
        placeholder="description"
        onChange={formik.handleChange}
        required
        errorText={formik.errors.description /*&& touched.description*/}
      />
      <Select
        className="company"
        label="company"
        options={CompaniesOptions}
        value={formik.values.company}
        onChange={(value) =>
          formik.setValues((values) => ({ ...values, company: value }))
        }
      />
      <Select
        className="franchise"
        label="franchise"
        options={franchisesOptions}
        value={formik.values.franchise}
        onChange={(value) =>
          formik.setValues((values) => ({ ...values, franchise: value }))
        }
      />
      <Select
        className="zone"
        label="zone"
        options={zonesOptions}
        value={formik.values.zone}
        onChange={(value) =>
          formik.setValues((values) => ({ ...values, zone: value }))
        }
      />
      <Input
        value={formik.values.openAt}
        label="openAt"
        placeholder="openAt"
        name="openAt"
        onChange={formik.handleChange}
        required
        errorText={formik.errors.openAt /*&& touched.email*/}
        icon={address}
      />
      <Input
        value={formik.values.closeAt}
        label="closeAt"
        placeholder="closeAt"
        name="closeAt"
        onChange={formik.handleChange}
        required
        errorText={formik.errors.closeAt /*&& touched.email*/}
        icon={address}
      />

      <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
};

export default BranchForm;
