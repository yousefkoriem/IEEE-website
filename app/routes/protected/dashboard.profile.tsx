import { useState, useCallback, useEffect } from "react";
import { getRoleName } from "~/utils/utile";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateUser } from "../../hooks/useApi";
import {
  facultyOptions,
  genderOptions,
  governorateOptions,
  yearOptions,
} from "~/utils/lists";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Users,
  Edit3,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fName: user?.firstName || "",
    mName: user?.middleName || "",
    lName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phone || "",
    goverment: user?.goverment || "",
    faculty: user?.faculty || "",
    year: user?.year || "",
    sex: user?.sex || "",
  });

  const updateUserMutation = useUpdateUser(user?.id || 0);

  useEffect(() => {
    if (user) {
      setEditedUser({
        fName: user.firstName || "",
        mName: user.middleName || "",
        lName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        goverment: user.goverment || "",
        faculty: user.faculty || "",
        year: user.year || "",
        sex: user.sex || "",
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser({
        fName: user?.firstName || "",
        mName: user?.middleName || "",
        lName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phone || "",
        goverment: user?.goverment || "",
        faculty: user?.faculty || "",
        year: user?.year || "",
        sex: user?.sex || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateUserMutation.mutate(editedUser, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleInputChange = useCallback((field: string, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const InputField = useCallback(
    ({
      label,
      value,
      field,
      icon: Icon,
      type = "text",
      options = [],
    }: {
      label: string;
      value: string;
      field: string;
      icon: any;
      type?: string;
      options?: Array<{ value: string; label: string }>;
    }) => {
      const displayValue = isEditing ? value : (user as any)?.[field] || "";
      console.log(`${isEditing} ${displayValue} ${value} ${field}`);

      return (
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Icon className="w-4 h-4 mr-2 text-gray-500" />
            {label}
          </label>
          {isEditing ? (
            type === "select" ? (
              <select
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )
          ) : (
            <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg">
              {type === "select" && options.length > 0
                ? options.find((opt) => opt.value === displayValue)?.label ||
                  displayValue ||
                  "Not provided"
                : displayValue || "Not provided"}
            </p>
          )}
        </div>
      );
    },
    [isEditing, user, handleInputChange]
  );

  return (
    <div className="space-y-6">
      <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
        <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
        <span className="text-[#000640] font-semibold text-sm">
          &nbsp;profile
        </span>
      </div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Profile
          </h1>
          <p className="text-sm text-gray-500">
            Manage your personal information
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={updateUserMutation.isPending}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateUserMutation.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleEditToggle}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {updateUserMutation.isSuccess && !isEditing && (
        <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <p className="text-green-700">
            Profile updated successfully!
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Personal Information
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              value={editedUser.fName}
              field="fName"
              icon={User}
            />

            <InputField
              label="Middle Name"
              value={editedUser.mName}
              field="mName"
              icon={User}
            />

            <InputField
              label="Last Name"
              value={editedUser.lName}
              field="lName"
              icon={User}
            />

            <InputField
              label="Email Address"
              value={editedUser.email}
              field="email"
              icon={Mail}
              type="email"
            />

            <InputField
              label="Phone Number"
              value={editedUser.phoneNumber}
              field="phoneNumber"
              icon={Phone}
            />

            <InputField
              label="Gender"
              value={editedUser.sex}
              field="sex"
              icon={Users}
              type="select"
              options={genderOptions}
            />

            <InputField
              label="Government"
              value={editedUser.goverment}
              field="goverment"
              icon={MapPin}
              type="select"
              options={governorateOptions}
            />

            <InputField
              label="Faculty"
              value={editedUser.faculty}
              field="faculty"
              icon={GraduationCap}
              type="select"
              options={facultyOptions}
            />

            <InputField
              label="Academic Year"
              value={editedUser.year}
              field="year"
              icon={Calendar}
              type="select"
              options={yearOptions}
            />

            {/* Read-only fields */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
                Account Status
              </label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                Role
              </label>
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg">
                {getRoleName(user?.roleId)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
