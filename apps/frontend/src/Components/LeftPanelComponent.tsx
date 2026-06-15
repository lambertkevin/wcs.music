import classNames from "classnames";

type Props = {
  className: string | undefined;
  links: string;
  onLinksChange: (
    e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => void;
  disableButton: boolean;
  onButtonClick: () => void;
};

const LeftPanelComponent = ({
  className,
  links,
  onLinksChange,
  disableButton,
  onButtonClick,
}: Props) => {
  return (
    <div className={className}>
      <textarea
        className="textarea w-full resize-none p-6 py-8 pb-0 bg-primary-content text-sm rounded-none h-screen focus:outline-0  font-mono"
        value={links}
        onChange={onLinksChange}
        name="Youtube links"
        placeholder="https://www.youtube.com/playlist?list=PLcSsTORVFETMHG88_Yl8MbmMja9G85uRW..."
      ></textarea>
      <button
        className={classNames([
          "btn btn-primary px-10 absolute bottom-4 right-5",
          disableButton ? "btn-disabled" : "",
        ])}
        onClick={onButtonClick}
      >
        {disableButton ? (
          <>
            <svg
              className="mr-2 size-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-10"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-30"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>Look for videos</>
        )}
      </button>
    </div>
  );
};

export default LeftPanelComponent;
