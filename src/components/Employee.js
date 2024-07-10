import EditEmployee from "./EditEmployee";

function Employee(props) {
  return (
    <div className="tw-m-2 tw-py-8 tw-px-8 tw-max-w-sm tw-bg-white tw-rounded-xl tw-shadow-lg tw-space-y-2 sm:tw-py-4 sm:tw-flex sm:tw-items-center sm:tw-space-y-0 sm:tw-space-x-6">
      <img
        className="tw-object-cover tw-block tw-h-[100px] tw-w-[100px] tw-mx-auto tw-h-24 tw-rounded-full sm:tw-mx-0 sm:tw-shrink-0"
        src={props.img}
        alt="Employee's Avatar"
      />

      <div className="tw-text-center tw-space-y-2 sm:tw-text-left">
        <div className="tw-space-y-0.5">
          <p className="tw-text-lg tw-text-black tw-font-semibold">{props.name}</p>

          <p className="tw-text-slate-500 tw-font-medium">{props.role}</p>
        </div>

        {props.editEmployee}

      </div>
    </div>
  );
}

export default Employee;
