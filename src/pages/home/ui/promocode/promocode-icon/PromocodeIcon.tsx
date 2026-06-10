interface Props {
  isInBuffer: boolean;
}

function PromocodeIcon({isInBuffer}: Props) {
  return (
    <i className="promocode__icon">
      {isInBuffer ? (
        <svg className="promocode__icon promocode__icon--check" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L4.70711 8.70711C4.31658 9.09763 3.68342 9.09763 3.29289 8.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L4 6.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893Z" fill="currentColor"/>
        </svg>) : (
        <svg className="promocode__icon promocode__icon--copy" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)">
            <path d="m14.5 9.5v-7c0-1.1045695-.8954305-2-2-2h-7c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2z" />
            <path d="m11.5 11.5v1c0 1.1045695-.8954305 2-2 2h-7c-1.1045695 0-2-.8954305-2-2v-7c0-1.1045695.8954305-2 2-2h1" />
          </g>
        </svg>
      )}
    </i>
  );
}

export default PromocodeIcon;
