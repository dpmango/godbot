export const PartnershipBody: React.FC<{}> = () => {
  return (
    <>
      <div className="partnership__partners">
        <h3 className="partnership__title">Мои партнеры</h3>
        <ul className="partnership__head">
          <li>ID</li>
          <li>Дата регистрации</li>
          <li>Email</li>
          <li>Прибыль</li>
        </ul>
        <ul className="partnership__body">
          <li>
            <p>1</p>
            <p>15.07.22 12:48:01</p>
            <p className="email">te****@gmail.com</p>
            <p className="sum">$2 300</p>
          </li>
          <li>
            <p>1</p>
            <p>15.07.22 12:48:01</p>
            <p className="email">te****@gmail.com</p>
            <p className="sum">$2 300</p>
          </li>
          <li>
            <p>1</p>
            <p>15.07.22 12:48:01</p>
            <p className="email">te****@gmail.com</p>
            <p className="sum">$2 300</p>
          </li>
        </ul>
      </div>
    </>
  );
};
