import { PartnershipHead } from "../components/Partnership/PartnershipHead";
import '../components/Partnership/partnership.scss'
import { PartnershipBody } from "../components/Partnership/PartnershipBody";
import { PartnershipSide } from "../components/Partnership/PartnershipSide";

export const Partnership: React.FC<{}> = () => {
  return (
    <div className="partnership">
      <PartnershipHead />
      <div className="partnership__inner">
        <PartnershipBody />
        <PartnershipSide/>
      </div>
    </div>
  );
};
