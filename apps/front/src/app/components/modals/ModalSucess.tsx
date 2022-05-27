import React from 'react';
import ModalContainer from '@components/feedback/Modal';
import Logo from '../../assets/svg/logoWhite.svg';
import VanTop from '../../assets/png/Vantop.png';
import Close from '../../assets/svg/closeOrange.svg';
import file from '../../assets/svg/file.svg';
import Question from '../../assets/svg/questionMark.svg';

interface PropsModal {
  open: boolean;
  onClose: () => void
}

const ModalSuccess = ({ open, onClose }: PropsModal) => {
  return (
    <ModalContainer open={open} classNameContainer='h-screen w-screen' contentClasses="py-0">
      <div className="bg-baseBlue w-widthLogoContainer h-heightLogoContainer flex justify-center px-4 py-6 shadow-boxShadowLogo absolute left-20 t-0">
        <img src={Logo} alt="packfast" className="w-widthLogo h-heightLogo" />
      </div>
      <div className="flex flex-col items-center px-4 py-6 absolute right-20 t-20 cursor-pointer z-20" >
        <img src={Close} alt="Close" width={45} height={45} onClick={onClose}/>
        <span>Fermer</span>
      </div>
      <div className='h-full w-full relative flex flex-col items-center'>
        <div className="h-1/2 bg-red">
          <img src={VanTop} alt="alt" className="h-full" />
        </div>
        <p className="text-center text-text48 text-baseBlue">
          Bienvenue à votre espace{' '}
          <span className="text-baseOrange">Particulier</span>
        </p>
        <p className='text-baseBlue text-text28'>
          La <span className='text-baseOrange'>1 ère solution</span> de livraison des colis via des points
        </p>
        <p className='text-baseBlue text-text28'>
          de relais en Tunisie
        </p>
        <div className="flex flex-col items-center mt-10">
          <div className="flex items-center my-4">
            <img
              src={file}
              alt="file"
              className="mr-2"
              width={16}
              height={20}
            />
            <span className="text-baseBlue text-sm underline cursor-pointer text-center">
              Conditions Générales et d'utilisation
            </span>
          </div>
          <div className="flex items-center my-4">
            <img
              src={Question}
              alt="mark"
              className="mr-2"
              width={24}
              height={24}
            />
            <span className="text-baseBlue text-sm underline cursor-pointer text-center">
              Besoin d'aide ?
            </span>
          </div>
        </div>

      </div>
    </ModalContainer>
  );
};

export default ModalSuccess;
