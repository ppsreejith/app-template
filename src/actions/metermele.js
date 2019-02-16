export const update_meter_mele = (inc) => {
    return (dispatch) => {
        dispatch({
            type: "TEST_UPDATE_METER_MELE",
            payload: {
                increment: inc
            }
        })
    }
}