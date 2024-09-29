const ImageProfileIcon = ({ route }: any) => {
  // Render different SVGs based on the route
  const renderIcon = () => {
    switch (route) {
      case '/profile-sekolah':
        return (
          <svg id="fi_2602412" enableBackground="new 0 0 18 18" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
            <g>
              <g>
                <path d="m17.678 16.493h-.297v-6.543h.297c.089 0 .172-.045.221-.119.05-.074.058-.165.021-.244l-1.114-2.507c-.042-.094-.357-.158-.627-.158h-5.727l-1.884-1.884v-1.366h1.769c.151 0 .273-.123.273-.273v-1.456c0-.151-.123-.273-.273-.273h-2.041c-.151 0-.273.123-.273.273v3.155l-1.884 1.884h-5.726c-.271 0-.585.064-.627.158l-1.115 2.507c-.038.08-.03.171.021.244s.132.119.221.119h.297v6.543h-.297c-.151 0-.273.123-.273.273s.123.273.273.273h17.454c.151 0 .273-.123 .273-.273s-.123-.273-.273-.273zm-6.991-13.614h-1.437v-.878h1.437zm-9.093 4.127h4.986l-2.073 2.073h-3.833zm-.486 2.507h3.503c.072 0 .141-.029.192-.08l4.465-4.465 4.465 4.465c.051.051.12.08.192.08h2.041c.151 0 .273-.123 .273-.273s-.123-.273-.273-.273h-1.929l-2.073-2.073h4.986l.922 2.073h-.745c-.151 0-.273.123-.273.273s.123.273.273.273h.297v6.543h-5.335v-1.374c0-.151-.123-.273-.273-.273h-.297v-4.89c0-.151-.123-.273-.273-.273h-3.504c-.151 0-.273.123-.273.273v4.89h-.297c-.151 0-.273.123-.273.273v1.374h-5.335zm9.248 4.489v2.073h-1.2v-2.073zm-1.749 2.073h-1.199v-2.073h1.199zm2.324.544v.618h-4.103v-.618z" fill="white"></path>
              </g>
              <g>
                <path d="m8.485 11.706c1.665 0 3.023-1.358 3.023-3.023s-1.358-3.023-3.023-3.023-3.023 1.358-3.023 3.023 1.358 3.023 3.023 3.023zm0-5.228c1.108 0 2.008.9 2.008 2.008s-.9 2.008-2.008 2.008-2.008-.9-2.008-2.008.9-2.008 2.008-2.008z" fill="white"></path>
              </g>
              <g>
                <path d="m8.485 10.541c.151 0 .273-.123 .273-.273v-.415l.434-.217c.136-.068.191-.234.123-.37s-.234-.191-.37-.123l-.59.295c-.094.047-.153.144-.153.25v.595c0 .151.123 .273.273 .273z" fill="white"></path>
              </g>
              <g>
                <path d="m5.553 13.287h-3.714c-.151 0-.273.123-.273.273v1.749c0 .151.123 .273.273 .273h.547c.151 0 .273-.123 .273-.273s-.123-.273-.273-.273h-.291v-1.199h1.436v1.199h-.018c-.151 0-.273.123-.273.273s.123 .273 .273 .273h2.333c.151 0 .273-.123 .273-.273v-1.749c0-.151-.123-.273-.273-.273zm-.273 1.749h-1.436v-1.199h1.436z" fill="white"></path>
              </g>
              <g>
                <path d="m5.553 10.414h-3.714c-.151 0-.273.123-.273.273v1.749c0 .151.123 .273.273 .273h3.714c.151 0 .273-.123 .273-.273v-1.749c0-.151-.123-.273-.273-.273zm-3.472.545h1.436v1.199h-1.436zm3.401 1.199h-1.436v-1.199h1.436z" fill="white"></path>
              </g>
              <g>
                <path d="m12.417 15.746h3.714c.151 0 .273-.123 .273-.273v-1.749c0-.151-.123-.273-.273-.273h-3.714c-.151 0-.273.123-.273.273v1.749c0 .151.123 .273.273 .273zm3.472-.545h-1.436v-1.199h1.436zm-3.401-1.199h1.436v1.199h-1.436z" fill="white"></path>
              </g>
              <g>
                <path d="m12.417 12.873h3.714c.151 0 .273-.123 .273-.273v-1.749c0-.151-.123-.273-.273-.273h-3.714c-.151 0-.273.123-.273.273v1.749c0 .151.123 .273.273 .273zm3.472-.545h-1.436v-1.199h1.436zm-3.401-1.199h1.436v1.199h-1.436z" fill="white"></path>
              </g>
            </g>
          </svg>


        );
      case '/sejarah':
        return (
          <div>
            <img src="/images/sejarah.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/news':
        return (
          <div>
            <img src="/images/news.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/sarana-prasarana':
        return (
          <div>
            <img src="/images/sarana.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );

      case '/alumni':
        return (
          <div>
            <img src="/images/graduate.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/struktur':
        return (
          <div>
            <img src="/images/grade.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/progja':
        return (
          <div>
            <img src="/images/progja.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/galeri-foto':
        return (
          <div>
            <img src="/images/photo.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/galeri-video':
        return (
          <div>
            <img src="/images/video.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/prestasi':
        return (
          <div>
            <img src="/images/prestasi.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/kepala-sekolah':
        return (
          <div>
            <img src="/images/headmaster.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/komite-sekolah':
        return (
          <div>
            <img src="/images/komite.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/ekstrakurikuler':
        return (
          <div>
            <img src="/images/extracurricular.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/siswa':
        return (
          <div>
            <img src="/images/student.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/kalender':
        return (
          <div>
            <img src="/images/calendar.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/silabus':
        return (
          <div>
            <img src="/images/dictionary.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/prestasi-guru':
        return (
          <div>
            <img src="/images/teacher.svg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      case '/kondisi-siswa':
        return (
          <div>
            <img src="/images/kondisi-siswa.jpg" alt="icon" className="w-[18px] h-[18px]" />
          </div>
        );
      // Add more cases for other routes
      default:
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2H16V16H2V2Z"
              fill=""
            />
          </svg>
        );
    }
  };

  return renderIcon();
};

export default ImageProfileIcon;
