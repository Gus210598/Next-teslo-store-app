import jwt from 'jsonwebtoken';

export const signToken = ( _id: string, email: string ) => {

    if ( !process.env.JWT_SECRET_SEED ){
        throw new Error('No hay semilla de JWT - Revisar vaiables de entorno')
    }

    return jwt.sign(
        // Payload
        { _id, email },

        // Seed
        process.env.JWT_SECRET_SEED,

        // Opciones
        { expiresIn: '30d' }

    )
}

export const isValidToken = ( token: string ): Promise<string> => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar vaiables de entorno')
    }

    if ( token.length <= 10 ) {
        return Promise.reject('JWT no es válido')
    }

    return new Promise(( resolve, reject ) => {

        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', ( err, payload ) => {
                if ( err ) return reject('JWT no es valido');

                const { _id } = payload as { _id: string };
                resolve( _id );
            })
        } catch (error) {
            reject('JWT no es valido');
        }
    })
}
