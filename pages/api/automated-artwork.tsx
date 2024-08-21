import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const imageHeight3 = "900px";
const imageHeight4 = "827px";
const imageHeight5 = "792px";

const imageWidth2 = "516px";
const imageWidth3 = "339px";

async function handle(req: NextRequest) {
  const fontLight = await fetch(
    new URL("../../assets/VisueltLight.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontMedium = await fetch(
    new URL("../../assets/VisueltMedium.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontArizona = await fetch(
    new URL("../../assets/ABCArizonaFlare.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex w-full h-full flex-col bg-white p-4">
        <div tw="flex mb-4">
          <div tw="flex flex-col grow max-w-[792px] bg-[#00CB0D] p-4 border-black border mr-4">
            <div
              tw="text-[2.75rem] font-bold"
              style={{ fontFamily: '"VisueltMedium"', lineHeight: "80%" }}
            >
              Discotheque International
            </div>
            <div
              tw="text-[2.75rem] flex mt-0.5"
              style={{
                fontFamily: '"VisueltMedium"',
                lineHeight: "90%",
                whiteSpace: "pre-wrap",
              }}
            >
              <span
                tw="-mt-0.5"
                style={{ fontFamily: '"Visuelt"', lineHeight: "90%" }}
              >
                with
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Haley,
              some other artists, more artists & another artist
            </div>
            <div
              tw="text-[2.75rem]"
              style={{ fontFamily: '"Visuelt"', lineHeight: "100%" }}
            >
              Tue 06 Feb / 14:00-15:00 (CET)
            </div>
          </div>
          <div tw="flex justify-center items-center w-[240px] border-black border bg-[#00CB0D]">
            <svg
              width="209"
              height="125"
              viewBox="0 0 209 125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M63.2989 53.0531C65.7918 53.0531 69.1551 57.3161 69.1551 62.3283C69.1551 65.2647 68.5171 67.5694 66.8946 69.6431C63.4151 66.0729 60.9222 61.2348 60.9222 56.4535C60.9222 54.3209 61.7926 53.0531 63.2989 53.0531ZM68.6333 80.9921C74.0247 80.9921 77.9098 78.9183 80.3457 75.2305L80.2887 75.1738C79.7647 75.2893 79.1859 75.3459 78.6048 75.3459C74.7219 75.3459 70.5473 73.2155 67.241 69.9894C74.2001 67.3973 77.9098 63.1931 77.9098 58.4117C77.9098 54.2054 74.1409 51.0382 68.6903 51.0382C59.4137 51.0382 53.7329 58.0088 53.7329 66.417C53.7329 75.3459 60.4574 80.9921 68.6333 80.9921Z"
                fill="black"
              />
              <path
                d="M182.33 110.569C180.232 109.924 178.118 109.331 175.989 108.798C180.791 103.075 184.683 96.0067 187.36 88.1975C191.405 88.8837 195.428 89.6722 199.425 90.5544C195.251 98.4029 189.392 105.234 182.33 110.569ZM27.293 60.313V39.863H29.1478C33.671 39.863 35.8745 43.5487 35.8745 49.367C35.8745 56.5097 34.4252 59.91 27.293 60.313ZM19.7003 105.428C-4.04465 81.8368 -4.04465 43.4507 19.7003 19.8596C31.5728 8.06409 47.1681 2.16524 62.7635 2.16524C76.9907 2.16524 91.2179 7.07732 102.619 16.8971C90.3979 28.2853 82.7505 44.4636 82.7505 62.3846C82.7505 75.1015 86.6027 86.9384 93.2044 96.8105C92.7659 97.1874 92.3252 97.5599 91.8845 97.9302C91.3232 98.3854 90.7356 98.8059 90.1634 99.2481C88.9882 100.085 87.7779 100.875 86.5303 101.598C84.0353 103.047 81.4043 104.258 78.6833 105.195C75.9624 106.131 73.1604 106.815 70.3233 107.24C67.484 107.65 64.6162 107.826 61.7549 107.739L60.6828 107.704C60.3254 107.685 59.9702 107.65 59.6128 107.621L58.5451 107.537C58.1877 107.502 57.8347 107.447 57.4795 107.404L56.4161 107.277C56.061 107.232 55.7102 107.162 55.3572 107.107L54.3004 106.929C53.9474 106.87 53.601 106.781 53.2502 106.709C52.5529 106.558 51.8535 106.413 51.1673 106.214C50.4766 106.031 49.786 105.848 49.1085 105.624C48.4266 105.41 47.7382 105.212 47.0717 104.953C46.4029 104.703 45.7254 104.476 45.0721 104.184C39.7859 102.017 34.8835 98.869 30.755 94.8871C26.5541 90.9748 23.1732 86.1913 20.7878 80.9568C20.7045 80.7782 20.6321 80.5952 20.551 80.4166H32.2217V79.493H27.293V61.4065L38.3674 80.4166H54.8924V79.493H52.1079L39.7596 60.0821C45.789 58.4679 49.2094 54.9543 49.2094 49.2515C49.2094 42.3398 42.6581 38.9416 31.2351 38.9416H9.37793L14.5369 42.0522V79.493H9.89974V80.4166H19.5161C19.6367 80.7281 19.7485 81.0418 19.8779 81.3511C22.1603 86.7751 25.5324 91.7351 29.6434 96.0024C33.8113 100.217 38.8059 103.655 44.2872 106.023C44.9646 106.338 45.6684 106.587 46.3657 106.859C47.0563 107.14 47.7711 107.36 48.4792 107.595C49.1852 107.846 49.9132 108.024 50.6323 108.22C51.3514 108.425 52.0837 108.58 52.8139 108.737C53.18 108.811 53.544 108.904 53.9123 108.965L55.0173 109.151C55.3879 109.207 55.754 109.281 56.1245 109.327L57.2383 109.46C57.6111 109.499 57.9794 109.547 58.3521 109.578L59.4725 109.647C59.8453 109.667 60.218 109.697 60.5907 109.71L61.7111 109.728C64.6973 109.769 67.6879 109.525 70.6171 108.974C73.5463 108.434 76.4207 107.613 79.181 106.521C81.9414 105.432 84.5965 104.097 87.0982 102.524C88.3501 101.742 89.556 100.888 90.729 99.9974C91.3057 99.5378 91.8976 99.0999 92.4611 98.6251L93.7043 97.5511C96.3682 101.415 99.4574 104.966 102.906 108.14C79.0122 128.975 42.4959 128.074 19.7003 105.428ZM197.309 30.5551C193.6 31.531 189.866 32.4045 186.112 33.1691C183.503 26.6233 180.052 20.8159 175.97 15.9779C178.105 15.4442 180.225 14.8495 182.33 14.2026C188.272 18.6899 193.361 24.2358 197.309 30.5551ZM189.449 80.9263C194.053 80.5669 197.437 78.5585 199.633 75.2322L199.576 75.1734C199.055 75.2888 198.476 75.3477 197.895 75.3477C194.012 75.3477 189.837 73.2151 186.531 69.989C193.488 67.3968 197.2 63.1927 197.2 58.4113C197.2 54.9827 194.694 52.2467 190.815 51.3514C190.778 51.0639 190.745 50.7763 190.703 50.491C189.857 44.6466 188.401 39.1333 186.45 34.0426C190.26 33.2628 194.049 32.374 197.816 31.3785C203.291 40.4512 206.441 51.0595 206.441 62.3846C206.441 72.2109 204.071 81.4948 199.868 89.7071C195.825 88.8096 191.754 88.008 187.66 87.3131C188.344 85.2306 188.943 83.0981 189.449 80.9263ZM171.679 85.1283C172.536 80.3665 173.133 75.315 173.428 70.0609C174.992 76.8529 180.925 80.9917 187.923 80.9917C188.112 80.9917 188.296 80.9829 188.48 80.9786C187.982 83.0785 187.404 85.1435 186.735 87.1584C181.747 86.3307 176.724 85.6554 171.679 85.1283ZM165.191 106.598C167.881 100.795 170.045 93.8154 171.51 86.0388C176.509 86.5594 181.484 87.226 186.43 88.045C183.736 95.8499 179.813 102.892 174.979 108.552C171.745 107.772 168.48 107.118 165.191 106.598ZM172.462 111.301C166.904 116.908 160.594 120.628 153.9 122.318C153.341 122.395 152.777 122.464 152.212 122.525C156.993 119.953 161.302 114.673 164.779 107.469C167.976 107.968 171.148 108.591 174.29 109.336C173.692 110.009 173.086 110.669 172.462 111.301ZM160.131 121.131C164.757 119.055 169.131 115.975 173.122 111.948C173.871 111.192 174.597 110.394 175.312 109.578C177.357 110.083 179.388 110.643 181.407 111.253C175.117 115.821 167.917 119.221 160.131 121.131ZM101.507 80.4166V80.3382C102.047 82.7256 102.691 85.0542 103.432 87.3109C99.3346 88.008 95.2609 88.8074 91.2158 89.7071C89.6985 86.7424 88.4181 83.6361 87.403 80.4166H101.507ZM93.268 31.3785C97.0391 32.3762 100.832 33.2649 104.645 34.0448C104.202 35.1993 103.785 36.3756 103.395 37.5714C102.084 37.3427 100.76 37.212 99.5363 37.212C94.704 37.212 90.6325 38.824 88.0344 42.477C89.4047 38.5822 91.1631 34.866 93.268 31.3785ZM108.754 14.2026C110.863 14.8517 112.987 15.4442 115.125 15.9801C111.036 20.8399 107.589 26.6581 104.987 33.1734C101.229 32.4089 97.4885 31.5332 93.7744 30.5551C97.7231 24.2358 102.812 18.6899 108.754 14.2026ZM159.894 3.58332C167.772 5.48062 175.053 8.90274 181.407 13.5186C179.383 14.1285 177.344 14.6905 175.294 15.1981C170.795 10.0703 165.575 6.09926 159.894 3.58332ZM164.779 17.3023C161.302 10.0986 156.993 4.8206 152.212 2.24365C152.736 2.30247 153.255 2.36564 153.775 2.43535C161.422 4.36097 168.458 8.91146 174.286 15.4355C171.144 16.1805 167.974 16.8056 164.779 17.3023ZM170.892 35.6741C169.462 29.1196 167.524 23.2055 165.191 18.1736C168.476 17.653 171.734 17.0017 174.963 16.2219C179.079 21.0163 182.567 26.8063 185.194 33.3564C180.453 34.2996 175.68 35.0707 170.892 35.6741ZM152.871 105.269C153.433 101.564 153.838 97.9999 154.108 95.301C163.176 94.9372 169.436 91.3212 170.464 85.9299C170.51 85.9342 170.559 85.9408 170.605 85.9451C169.144 93.7347 166.987 100.705 164.303 106.46C160.521 105.89 156.708 105.491 152.871 105.269ZM141.738 122.769C136.178 121.014 131.15 115.466 127.195 107.33C130.894 106.781 134.625 106.399 138.375 106.186C139.64 114.189 141.291 120.219 143.277 122.843C142.762 122.826 142.251 122.8 141.738 122.769ZM119.574 86.041C121.038 93.8153 123.202 100.795 125.893 106.598C122.608 107.118 119.348 107.77 116.118 108.549C111.299 102.921 107.37 95.9392 104.654 88.045C109.598 87.226 114.575 86.5594 119.574 86.041ZM125.893 18.1736C123.56 23.2055 121.622 29.1196 120.192 35.672C115.408 35.0707 110.641 34.3018 105.903 33.3586C108.523 26.8411 111.996 21.0359 116.116 16.2219C119.348 17.0017 122.606 17.653 125.893 18.1736ZM138.375 18.5853C134.625 18.3718 130.894 17.9906 127.195 17.4417C131.15 9.30573 136.178 3.75758 141.738 2.00186C142.251 1.96919 142.762 1.94523 143.277 1.92562C141.291 4.55266 139.64 10.58 138.375 18.5853ZM154.737 37.0574C154.292 30.7773 153.674 24.7695 152.882 19.5002C156.713 19.278 160.526 18.8816 164.303 18.3109C166.632 23.3057 168.565 29.2176 169.991 35.7852C164.924 36.4017 159.837 36.8265 154.737 37.0574ZM165.375 51.7609L163.435 52.8C161.341 51.517 158.747 50.8657 155.72 50.8657C155.619 50.8657 155.527 50.8766 155.428 50.8766C155.299 46.5613 155.09 42.2156 154.803 37.9788C159.942 37.7435 165.073 37.3144 170.181 36.6914C170.947 40.3706 171.554 44.248 171.979 48.2778C169.445 49.5826 167.463 50.6435 165.375 51.7609ZM137.063 84.8364C138.971 84.7732 140.878 84.7275 142.786 84.7078C142.974 84.9997 143.181 85.2786 143.417 85.5334C141.063 86.4919 139.719 88.0385 139.719 89.8051C139.719 93.5256 143.928 95.3336 152.589 95.3336C152.784 95.3336 152.977 95.3293 153.17 95.3249C152.801 99.0411 152.391 102.333 151.953 105.223C149.822 105.116 147.684 105.055 145.542 105.055C143.395 105.055 141.253 105.116 139.118 105.223C138.252 99.5443 137.539 92.6783 137.063 84.8364ZM136.173 84.869C136.636 92.3254 137.331 99.309 138.232 105.269C134.391 105.489 130.569 105.89 126.781 106.46C124.097 100.705 121.937 93.7347 120.479 85.9451C125.691 85.4223 130.927 85.0651 136.173 84.869ZM124.932 75.9794V80.4166H135.926C135.983 81.6016 136.046 82.78 136.116 83.9476C130.832 84.1437 125.561 84.5074 120.313 85.0346C119.995 83.2549 119.714 81.436 119.471 79.5801C121.198 78.6565 122.998 77.3778 124.932 75.9794ZM136.298 37.9788C136.013 42.1285 135.803 46.4415 135.667 50.8199L121.628 55.7037L124.932 58.5268V75.0579C123.946 75.4043 122.902 75.6352 121.975 75.6352C119.076 75.6352 118.67 73.7335 118.67 68.8955V53.3032C119.061 47.4544 119.824 41.878 120.902 36.6914C126.018 37.3144 131.152 37.7457 136.298 37.9788ZM136.362 37.0574C131.26 36.8265 126.167 36.4017 121.093 35.7852C122.518 29.2176 124.452 23.3057 126.781 18.3109C130.569 18.8816 134.391 19.2802 138.232 19.5024C137.447 24.6977 136.818 30.6706 136.362 37.0574ZM145.542 37.2708C142.777 37.2708 140.012 37.2077 137.25 37.0944C137.717 30.4266 138.359 24.5299 139.118 19.5481C141.253 19.6549 143.395 19.7159 145.542 19.7159C147.684 19.7159 149.819 19.6549 151.948 19.5481C152.705 24.4907 153.352 30.37 153.823 37.0944C151.065 37.2077 148.304 37.2708 145.542 37.2708ZM142.271 62.4434C142.271 66.018 143.72 69.1046 146.358 71.1588C143.088 74.5003 141.69 77.3125 141.69 80.5299C141.69 81.7606 141.898 82.8454 142.299 83.7886C140.536 83.8104 138.771 83.8561 137.009 83.9149C136.943 82.7692 136.884 81.6016 136.827 80.4166H139.427V79.493H136.785C136.675 77.038 136.59 74.5003 136.528 71.8863V52.8828C136.651 47.6004 136.877 42.6295 137.186 38.0158C139.969 38.1313 142.755 38.1944 145.542 38.1944C148.324 38.1944 151.107 38.1313 153.887 38.0158C154.156 42.0283 154.365 46.3326 154.498 50.9114C147.136 51.3623 142.271 55.8758 142.271 62.4434ZM163.838 89.9772C163.838 91.9812 160.398 93.5518 156.009 93.5518C149.92 93.5518 145.809 90.9988 144.373 86.3459C146.026 87.5309 148.416 88.1321 151.486 88.1321H157.748C161.959 88.1321 163.838 88.7007 163.838 89.9772ZM161.81 69.7015C161.81 71.2045 161.069 72.0649 159.778 72.0649C157.844 72.0649 155.57 69.549 152.624 64.1468C150.199 59.6922 149.166 56.9954 149.166 55.1286C149.166 53.7367 150.023 52.7651 151.256 52.7651C153.115 52.7651 155.171 55.0589 158.353 60.6833C160.646 64.7545 161.81 67.7867 161.81 69.7015ZM149.346 2.00186C154.906 3.75758 159.934 9.30573 163.889 17.4417C160.199 17.9885 156.48 18.3697 152.74 18.5831C151.503 10.689 149.866 4.58098 147.84 1.9278C148.342 1.94523 148.844 1.97137 149.346 2.00186ZM145.542 1.87988C145.901 1.87988 146.257 1.88859 146.614 1.89295C148.449 3.54847 150.328 9.34494 151.808 18.6311C149.725 18.7356 147.636 18.7923 145.542 18.7923C143.444 18.7923 141.348 18.7356 139.26 18.6311C140.716 9.46475 142.575 3.56589 144.452 1.89295C144.816 1.88859 145.178 1.87988 145.542 1.87988ZM115.796 15.1981C113.744 14.6927 111.703 14.1307 109.677 13.5186C116.009 8.91799 123.266 5.50241 131.113 3.60074C125.441 6.12758 120.253 10.103 115.796 15.1981ZM137.219 2.44842C137.767 2.37218 138.32 2.30465 138.872 2.24365C134.088 4.81841 129.782 10.0986 126.305 17.3023C123.112 16.8056 119.944 16.1826 116.802 15.4377C122.577 8.95938 129.558 4.38929 137.219 2.44842ZM100.462 62.3846C100.462 59.2325 100.641 56.1372 100.983 53.1115H104.06V52.1901H101.095C101.431 49.5151 101.891 46.899 102.474 44.3547L106.495 50.1751H106.552L108.118 38.9416C106.976 38.4406 105.662 38.042 104.309 37.7501C104.7 36.5585 105.118 35.3844 105.564 34.2343C110.35 35.1906 115.165 35.9682 120.001 36.5803C119.048 41.1417 118.339 45.9971 117.912 51.0726L103.77 55.9912L107.074 58.8143V71.2002C107.074 78.0531 109.335 81.0505 114.553 81.0505C115.882 81.0505 117.221 80.6584 118.602 80.0136C118.837 81.7519 119.102 83.4597 119.405 85.1283C114.362 85.6554 109.341 86.3307 104.353 87.1584C101.854 79.5845 100.462 71.2002 100.462 62.3846ZM96.5808 52.1901V44.126C96.5808 40.4381 96.754 38.5386 97.5083 38.2489C98.2559 37.9635 100.093 40.8629 101.766 43.3287C101.075 46.1975 100.536 49.1579 100.161 52.1901H96.5808ZM100.049 53.1115C99.7096 56.1372 99.532 59.2347 99.532 62.3846C99.532 68.3183 100.159 74.0581 101.321 79.493H96.5808V53.1115H100.049ZM131.113 121.171C123.266 119.269 116.009 115.853 109.677 111.253C111.703 110.641 113.744 110.079 115.796 109.573C120.253 114.668 125.441 118.644 131.113 121.171ZM116.805 109.334C119.944 108.589 123.112 107.966 126.305 107.469C129.782 114.673 134.088 119.953 138.872 122.525C138.32 122.467 137.767 122.399 137.219 122.323C129.558 120.382 122.577 115.812 116.805 109.334ZM145.542 122.891C145.178 122.891 144.816 122.883 144.452 122.876C142.575 121.205 140.716 115.307 139.26 106.14C141.348 106.036 143.444 105.979 145.542 105.979C147.638 105.979 149.727 106.036 151.81 106.14C150.194 116.367 148.232 121.391 146.586 122.878C146.237 122.883 145.89 122.891 145.542 122.891ZM147.833 122.843C150.074 119.898 151.661 112.917 152.727 106.186C156.472 106.402 160.194 106.781 163.889 107.33C159.934 115.466 154.906 121.014 149.346 122.769C148.842 122.8 148.34 122.824 147.833 122.843ZM172.716 62.3846C172.716 70.3855 172.025 78.0291 170.771 85.0346C170.71 85.0281 170.648 85.0215 170.589 85.015C170.607 84.7906 170.618 84.5641 170.618 84.3332C170.618 79.4494 167.167 77.0772 160.067 77.0772H153.4C150.874 77.0772 149.087 76.476 148.085 75.2932C147.342 74.4132 147.068 73.2499 147.267 71.8319C149.589 73.3022 152.444 74.0777 155.544 74.0777C163.312 74.0777 168.53 69.4248 168.53 62.5C168.53 58.9428 167.25 55.9128 164.904 53.8739C167.351 54.5666 170.412 56.0696 172.622 57.3374C172.683 59.0016 172.716 60.6855 172.716 62.3846ZM188.445 62.3279C188.445 65.2664 187.807 67.5689 186.185 69.6427C182.705 66.0724 180.212 61.2344 180.212 56.453C180.212 54.3205 181.08 53.0549 182.589 53.0549C185.082 53.0549 188.445 57.3178 188.445 62.3279ZM187.98 51.0377C180.491 51.0377 175.345 55.5839 173.641 61.7616C173.602 52.7848 172.69 44.261 171.085 36.5803C175.921 35.9682 180.743 35.1906 185.531 34.2321C187.485 39.2988 188.941 44.7925 189.782 50.6217C189.809 50.8047 189.831 50.9898 189.857 51.1728C189.256 51.0857 188.631 51.0377 187.98 51.0377ZM91.6586 90.5544C95.6578 89.67 99.6811 88.8815 103.728 88.1975C106.432 96.096 110.337 103.101 115.125 108.791C112.987 109.325 110.863 109.92 108.754 110.569C101.692 105.234 95.8332 98.4029 91.6586 90.5544ZM145.542 0C129.64 0 115.101 5.90757 104.027 15.6228C79.3893 -5.74855 41.825 -4.78138 18.3629 18.5309C-6.12095 42.8538 -6.12095 82.4315 18.3629 106.757C30.6037 118.918 46.6836 125 62.7635 125C77.6265 125 92.4874 119.798 104.32 109.405C115.358 118.97 129.78 124.771 145.542 124.771C180.166 124.771 208.333 96.7844 208.333 62.3846C208.333 27.9869 180.166 0 145.542 0Z"
                fill="black"
              />
              <path
                d="M47.2628 36.0656C50.1723 36.0656 52.5314 31.8985 52.5314 26.7555C52.5314 21.6147 50.1723 17.4476 47.2628 17.4476C44.3534 17.4476 41.9942 21.6147 41.9942 26.7555C41.9942 31.8985 44.3534 36.0656 47.2628 36.0656Z"
                fill="black"
              />
              <path
                d="M78.3968 36.0656C81.3062 36.0656 83.6654 31.8985 83.6654 26.7555C83.6654 21.6147 81.3062 17.4476 78.3968 17.4476C75.4873 17.4476 73.1282 21.6147 73.1282 26.7555C73.1282 31.8985 75.4873 36.0656 78.3968 36.0656Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div tw="flex h-[827px] w-full mb-4">
          <img
            tw="flex border-black border h-full w-[516px] mr-4"
            src="https://picsum.photos/1600/1600"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <img
            tw="flex border-black border h-full w-[516px] mr-4"
            src="https://picsum.photos/1600/1600?grayscale"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div
          tw="flex absolute bottom-4 left-4 text-[1.75rem] bg-[#00CB0D] p-4 border-black border"
          style={{ fontFamily: '"fontArizona"', lineHeight: "90%" }}
        >
          refugeworldwide.com
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
      fonts: [
        {
          name: "Visuelt",
          data: fontLight,
          style: "normal",
        },
        {
          name: "VisueltMedium",
          data: fontMedium,
          style: "normal",
        },
        {
          name: "fontArizona",
          data: fontArizona,
          style: "normal",
        },
      ],
      // debug: true,
    }
  );
}

export default handle;
