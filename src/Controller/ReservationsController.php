<?php

namespace App\Controller;

use App\Repository\ReservationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReservationsController extends AbstractController
{
    /**
     * @Route ("/reservations", name="reservations")
     * @param ReservationRepository $repository
     * @return Response
     */
    public function index(ReservationRepository $repository): Response
    {
        return $this->json($repository->findAll());
    }
}
