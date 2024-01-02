import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 100000,
  bgcolor: '#3C0384',
  border: '1px solid #3C0384' ,
  boxShadow: 24,
  borderRadius:5,
  p: 4,
};

const WinModel = ({ open, loser, winner }) => { 
  return (
    <div> 
    <Modal
      open={open} 
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='text-center text-white'>
        <Typography id="modal-modal-title" variant="h4" component="h2" className='fw-bold'>
         {winner ? `${winner} You Win !! 🥇`: `${loser} You Lose 😔` } 
        </Typography>
        <Typography id="modal-modal-description"   sx={{ mt: 2 }}>
        {winner ? `Congratulations 🎉🎉💗 `: `        Good luck next time 💗 ` } 
        </Typography>
      </Box>
    </Modal>
  </div>

  );
};

export default WinModel;
