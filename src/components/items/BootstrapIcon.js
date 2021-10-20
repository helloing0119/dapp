import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconConst } from '../utils/Consts';

const propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  content: PropTypes.string.isRequired
};

const defaultProps = {
  className: "bi",
  width: "1em",
  height: "1em"
};

export default class BootstrapIcon extends Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  contentToSvgJSX(content) {
    //1. serach icon from https://icons.getbootstrap.com/#usage
    //2. copy HTML svg
    //3. add case "icon-name":
    //4. change width, height, viewbox to {width}, {height}, {viewbox}
    //   or replace svg element with code below
    //<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
    //NEVER FORGET to reformat the code 
    const width = this.props.width;
    const height = this.props.height;
    const viewbox = "0 0 " + width.toString() + " " + height.toString();

    switch (content) {
      case IconConst.HOME:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
          <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
        </svg>;
      case IconConst.FILE_LIST:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
      case IconConst.FILE_UPLOAD:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z" />
        </svg>
      case IconConst.SEARCH:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>

      case IconConst.EXT_TEXT:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
        </svg>
      case IconConst.EXT_PDF:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
          <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z" />
        </svg>
      case IconConst.EXT_VIDEO:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z" />
        </svg>
      case IconConst.EXT_SOUND:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 6.64v1.75l-2 .5v3.61c0 .495-.301.883-.662 1.123C7.974 13.866 7.499 14 7 14c-.5 0-.974-.134-1.338-.377-.36-.24-.662-.628-.662-1.123s.301-.883.662-1.123C6.026 11.134 6.501 11 7 11c.356 0 .7.068 1 .196V6.89a1 1 0 0 1 .757-.97l1-.25A1 1 0 0 1 11 6.64z" />
        </svg>
      case IconConst.EXT_IMAGE:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
          <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z" />
        </svg>
      case IconConst.EXT_SHEET:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M6 12v-2h3v2H6z" />
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z" />
        </svg>
      case IconConst.EXT_ZIP:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M5.5 9.438V8.5h1v.938a1 1 0 0 0 .03.243l.4 1.598-.93.62-.93-.62.4-1.598a1 1 0 0 0 .03-.243z" />
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-4-.5V2h-1V1H6v1h1v1H6v1h1v1H6v1h1v1H5.5V6h-1V5h1V4h-1V3h1zm0 4.5h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5a1 1 0 0 1 1-1z" />
        </svg>
      case IconConst.EXT_DEFAULT:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
        </svg>

      case IconConst.LOGO:
        return <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={width} height={height} viewBox="0 0 750 750">
          <g id="surface1">
            <path d="M 331.125 46.949219 C 315.375 49.199219 305.476562 51.523438 298.949219 54.375 C 293.175781 56.925781 286.726562 61.351562 283.273438 65.175781 C 278.023438 71.023438 278.101562 70.5 277.875 103.5 C 277.800781 119.773438 277.949219 151.351562 278.175781 173.625 L 278.625 214.125 L 280.648438 218.25 C 282.074219 221.101562 283.648438 223.050781 285.898438 224.476562 C 288.75 226.351562 289.648438 226.574219 293.699219 226.351562 C 299.398438 225.976562 303.148438 223.425781 305.476562 218.324219 C 307.351562 214.273438 307.273438 218.25 306.824219 135.75 L 306.523438 82.125 L 309.074219 80.851562 C 310.5 80.175781 315.148438 78.824219 319.5 78 C 326.175781 76.574219 329.101562 76.425781 339 76.726562 C 348.75 77.023438 351.675781 77.398438 357.300781 79.050781 C 377.773438 85.199219 395.773438 98.324219 413.023438 119.773438 C 422.925781 132 435.074219 150.976562 437.476562 157.949219 C 438.300781 160.273438 438.601562 173.699219 439.050781 226.125 C 439.351562 265.273438 439.875 292.726562 440.324219 294.898438 C 442.199219 303.675781 449.699219 308.851562 457.351562 306.824219 C 461.324219 305.699219 464.851562 302.699219 466.574219 298.875 C 467.851562 296.023438 468 292.726562 467.925781 244.125 C 467.925781 215.625 467.625 183.375 467.25 172.351562 C 466.425781 148.875 465.824219 146.023438 458.101562 132.75 C 430.351562 84.976562 395.925781 56.023438 358.351562 48.824219 C 350.773438 47.398438 335.550781 46.351562 331.125 46.949219 Z M 331.125 46.949219 " />
            <path d="M 228.75 156.148438 C 226.875 157.125 214.949219 163.726562 202.125 170.773438 C 161.25 193.273438 140.175781 204.824219 128.101562 211.351562 C 115.875 217.949219 111.976562 221.023438 109.273438 226.125 C 107.625 229.125 107.625 229.199219 107.101562 318.375 C 106.800781 367.425781 106.574219 436.273438 106.726562 471.375 L 106.875 535.125 L 108.976562 538.648438 C 110.101562 540.601562 112.425781 543.148438 114.226562 544.351562 C 115.949219 545.550781 127.648438 552.148438 140.25 558.898438 C 152.851562 565.726562 166.5 573.148438 170.625 575.398438 C 174.75 577.648438 181.875 581.476562 186.375 583.875 C 190.949219 586.273438 195 588.449219 195.375 588.75 C 195.824219 589.050781 200.175781 591.375 205.125 594 C 210.074219 596.550781 214.5 598.949219 214.875 599.25 C 215.324219 599.550781 222.523438 603.523438 231 608.023438 C 239.476562 612.601562 252.449219 619.574219 259.875 623.625 C 267.300781 627.601562 279.976562 634.5 288 638.773438 C 296.023438 643.125 308.398438 649.800781 315.375 653.625 C 322.425781 657.375 330.824219 661.949219 334.125 663.75 C 337.425781 665.476562 344.023438 669.074219 348.75 671.625 C 368.25 682.273438 402.523438 700.800781 404.550781 701.851562 C 407.699219 703.425781 413.324219 703.875 416.699219 702.75 C 418.351562 702.226562 428.398438 697.050781 439.125 691.273438 C 449.851562 685.574219 461.175781 679.5 464.25 677.851562 C 467.324219 676.199219 472.273438 673.5 475.125 672 C 478.050781 670.425781 506.023438 655.425781 537.375 638.625 C 568.726562 621.824219 603.300781 603.300781 614.101562 597.449219 C 624.976562 591.675781 635.175781 585.824219 636.75 584.476562 C 638.25 583.125 640.351562 580.273438 641.324219 578.101562 L 643.125 574.125 L 643.351562 421.425781 C 643.5 272.476562 643.5 268.574219 642.074219 265.351562 C 641.324219 263.476562 639.148438 260.699219 637.425781 259.199219 C 635.625 257.625 611.851562 244.425781 584.625 229.726562 C 557.398438 215.101562 529.875 200.324219 523.5 196.875 C 506.851562 187.875 502.5 186.75 496.050781 189.675781 C 488.476562 193.125 486 202.574219 490.800781 209.773438 C 493.125 213.300781 495.824219 215.101562 511.5 223.5 C 517.875 226.949219 525.148438 230.851562 527.625 232.125 C 570.75 255.375 589.949219 265.648438 593.851562 267.375 C 596.398438 268.5 598.5 269.925781 598.5 270.449219 C 598.5 271.050781 595.050781 273.226562 590.851562 275.324219 C 586.574219 277.425781 572.476562 284.925781 559.5 291.976562 C 546.523438 298.949219 527.925781 309 518.25 314.25 C 508.574219 319.5 487.648438 330.824219 471.75 339.375 C 455.851562 347.925781 436.425781 358.425781 428.550781 362.699219 C 420.675781 366.976562 413.550781 370.5 412.800781 370.5 C 412.050781 370.5 410.550781 370.050781 409.5 369.449219 C 403.050781 366 345.601562 335.175781 339.75 332.101562 C 335.851562 330 329.398438 326.550781 325.5 324.375 C 321.601562 322.199219 308.398438 315.148438 296.25 308.625 C 272.25 295.800781 250.574219 284.175781 200.625 257.398438 C 182.925781 247.949219 164.773438 238.351562 160.351562 236.101562 C 155.851562 233.925781 152.25 231.75 152.25 231.375 C 152.25 230.925781 156.074219 228.675781 160.726562 226.351562 C 165.300781 224.023438 181.800781 215.101562 197.25 206.625 C 212.699219 198.074219 228.898438 189.300781 233.25 186.976562 C 237.523438 184.648438 242.398438 181.726562 243.976562 180.449219 C 255.75 171 251.625 155.699219 237 154.726562 C 232.875 154.425781 231.601562 154.648438 228.75 156.148438 Z M 140.324219 257.699219 C 144.300781 260.175781 153.75 265.351562 185.625 282.375 C 194.699219 287.25 209.25 294.976562 217.875 299.625 C 226.574219 304.273438 247.648438 315.601562 264.75 324.75 C 301.273438 344.324219 318.300781 353.476562 352.5 371.773438 C 366.300781 379.199219 381.898438 387.523438 387.148438 390.300781 C 392.398438 393.074219 396.824219 395.925781 397.050781 396.601562 C 397.726562 398.851562 397.351562 612 396.675781 612.449219 C 396.300781 612.675781 394.050781 611.699219 391.648438 610.273438 C 388.050781 608.101562 373.875 600.375 325.5 574.351562 C 322.425781 572.625 307.050781 564.375 291.375 555.976562 C 275.699219 547.5 259.648438 538.800781 255.75 536.625 C 251.851562 534.449219 244.273438 530.398438 238.875 527.625 C 233.550781 524.851562 228.148438 521.925781 226.875 521.25 C 225.675781 520.5 218.023438 516.375 210 512.101562 C 201.976562 507.75 184.050781 498.148438 170.25 490.726562 C 156.449219 483.226562 142.875 476.023438 140.101562 474.675781 L 135 472.199219 L 135 464.851562 C 135 456.226562 135.148438 456.148438 141.675781 460.050781 C 146.925781 463.199219 165.375 473.175781 237.074219 511.726562 C 272.101562 530.625 295.199219 542.550781 297.449219 543.074219 C 302.476562 544.199219 306.976562 542.925781 310.574219 539.324219 C 315.226562 534.675781 315.898438 529.050781 312.675781 522.601562 C 310.800781 518.851562 308.101562 516.976562 294.226562 509.476562 C 281.625 502.648438 189.675781 453.148438 179.550781 447.675781 C 176.324219 445.949219 167.925781 441.375 160.875 437.625 C 153.898438 433.800781 145.726562 429.523438 142.800781 428.023438 C 139.949219 426.601562 137.101562 424.875 136.574219 424.273438 C 135.226562 422.550781 134.699219 403.574219 136.050781 403.050781 C 136.648438 402.824219 139.199219 403.949219 141.824219 405.601562 C 151.5 411.523438 220.273438 448.125 224.175781 449.476562 C 226.875 450.375 229.199219 450.675781 230.925781 450.375 C 243.226562 448.125 246.976562 434.25 237.675781 425.550781 C 235.574219 423.601562 160.726562 382.574219 141.523438 372.898438 C 138.148438 371.175781 136.125 369.675781 135.675781 368.476562 C 134.699219 365.925781 134.773438 352.726562 135.75 352.125 C 136.199219 351.824219 138.898438 353.023438 141.75 354.75 C 151.726562 360.601562 172.125 371.324219 175.726562 372.523438 C 186.898438 376.199219 197.175781 367.125 194.25 356.175781 C 192.601562 350.023438 188.25 346.875 162 333 C 149.023438 326.101562 137.625 319.726562 136.726562 318.898438 C 135.226562 317.476562 135 316.574219 135 311.25 C 135 304.425781 134.925781 304.425781 141.300781 306.375 C 152.851562 309.898438 162.601562 298.648438 157.574219 287.625 C 155.773438 283.5 151.875 280.351562 144.074219 276.449219 C 140.476562 274.648438 137.101562 272.550781 136.5 271.949219 C 135.523438 270.675781 134.550781 258.75 135.300781 256.726562 C 135.898438 255.300781 136.875 255.523438 140.324219 257.699219 Z M 615.074219 406.125 C 615 523.648438 614.550781 562.949219 613.273438 564.601562 C 612.824219 565.199219 610.425781 566.625 607.949219 567.898438 C 603.898438 569.925781 558.75 594.074219 531.75 608.625 C 516.300781 616.949219 461.175781 646.425781 451.875 651.375 C 447.375 653.773438 439.800781 657.898438 435.226562 660.523438 C 430.574219 663.074219 426.449219 665.25 426 665.25 C 425.476562 665.25 425.25 620.851562 425.25 531.75 C 425.25 405.601562 425.324219 398.175781 426.601562 397.050781 C 427.273438 396.375 437.175781 390.898438 448.5 384.824219 C 471.523438 372.523438 484.800781 365.324219 503.625 355.125 C 510.675781 351.300781 534.75 338.324219 557.25 326.25 C 579.75 314.101562 601.5 302.25 605.625 299.851562 C 609.75 297.449219 613.574219 295.574219 614.101562 295.726562 C 614.925781 295.875 615.074219 315.976562 615.074219 406.125 Z M 140.25 507.300781 C 141.75 508.273438 167.175781 522.148438 196.875 538.125 C 226.574219 554.101562 257.324219 570.601562 265.125 574.875 C 286.425781 586.425781 325.273438 607.273438 343.5 617.023438 C 352.351562 621.824219 361.351562 626.625 363.375 627.75 C 365.476562 628.875 368.851562 630.75 370.875 631.875 C 372.976562 633.074219 379.5 636.449219 385.5 639.523438 C 391.5 642.601562 396.601562 645.523438 396.898438 645.976562 C 397.800781 647.398438 397.574219 663.601562 396.75 664.125 C 396.300781 664.425781 393.675781 663.300781 390.898438 661.648438 C 385.574219 658.5 376.199219 653.324219 360.75 645 C 355.574219 642.226562 334.351562 630.75 313.5 619.5 C 244.949219 582.449219 221.851562 569.925781 203.25 559.875 C 178.050781 546.300781 145.949219 529.050781 141 526.351562 C 138.75 525.148438 136.425781 523.574219 135.976562 522.898438 C 135.300781 522.148438 135 518.925781 135 513.601562 C 135 504.449219 135.375 503.925781 140.25 507.300781 Z M 140.25 507.300781 " />
            <path d="M 539.324219 391.648438 C 526.125 393.675781 510.523438 408.074219 501.074219 427.050781 C 490.199219 448.875 489.375 472.648438 499.050781 485.398438 C 501.824219 488.925781 507.226562 492.300781 511.726562 493.050781 C 513.976562 493.5 514.5 493.875 514.199219 494.851562 C 513.675781 496.351562 504.675781 531.148438 496.199219 564 C 493.050781 576.148438 490.125 586.726562 489.675781 587.476562 C 489.226562 588.300781 489.074219 589.050781 489.300781 589.273438 C 489.675781 589.726562 493.351562 587.851562 537.601562 564.75 C 555 555.675781 568.5 548.175781 568.5 547.574219 C 568.5 547.050781 563.101562 531.449219 556.5 513 C 549.898438 494.550781 544.5 479.101562 544.5 478.726562 C 544.5 478.351562 545.625 476.699219 546.976562 475.050781 C 559.351562 460.5 567 440.324219 567 422.773438 C 567 407.773438 562.273438 397.726562 553.273438 393.449219 C 548.625 391.273438 544.875 390.824219 539.324219 391.648438 Z M 539.324219 391.648438 " />
          </g>
        </svg>


      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewbox={viewbox} fill="currentColor">
          <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
        </svg>
    }
  }

  render() {
    const content = this.props.content;
    return this.contentToSvgJSX(content);
  }
};

BootstrapIcon.propTypes = propTypes;
BootstrapIcon.defaultProps = defaultProps;