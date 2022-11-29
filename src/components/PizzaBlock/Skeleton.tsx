import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = (props) => (
    <ContentLoader
        className = "pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="134" cy="141" r="125" />
        <rect x="27" y="305" rx="0" ry="0" width="236" height="4" />
        <rect x="0" y="285" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="329" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="434" rx="10" ry="10" width="74" height="27" />
        <rect x="126" y="430" rx="25" ry="25" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton