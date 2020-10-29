export default function ResponsiveImage( { src, width, height } ) {
    return (
        <div
            style={ {
                width,
            } }
            className="responsive-image">
            <div style={ {
                paddingBottom: ( height / width * 100 ) + '%'
            } } />
            <img
                src={ src }
                className="responsive-image__image" />
        </div>
    );
}
