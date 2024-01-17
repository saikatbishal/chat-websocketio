
type PopupWindowProps = {
  children: React.ReactNode;
  styles: string[];
};

const PopupWindow = ({ children, styles }: PopupWindowProps) => {
  return (
    <div className={`${styles.join(' ')}`}>{children}</div>
  );
};

export default PopupWindow;


