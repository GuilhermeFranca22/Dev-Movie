import styled  from 'styled-components' 


export const Container = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 10px;

    div {
        display: flex;
        flex-direction: column;
    }

    img {
        height: 200px;
    }
`

export const Title = styled.h4`
    font-size: 28px;
    font-weight: 700;
`