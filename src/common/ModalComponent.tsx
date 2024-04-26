import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";

interface ModalProps {
  open: boolean;
  image: string;
  onClose: () => void;
  title: string;
  content: string;
  history: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  open,
  image,
  onClose,
  title,
  content,
  history
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
          />
        </Card>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="body1">{history}</Typography>
        {/* Puedes agregar más contenido aquí si lo necesitas */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalComponent;
