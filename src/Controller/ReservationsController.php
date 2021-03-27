<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Repository\DayRepository;
use App\Repository\IntervalRepository;
use App\Repository\ReservationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReservationsController extends AbstractController
{
    /**
     * @Route ("/reservations", name="reservations", methods={"GET"})
     */
    public function index(ReservationRepository $repository): Response
    {
        return $this->json($repository->findAll());
    }

    /**
     * @Route ("/reservations", name="save_reservations", methods={"POST"})
     */
    public function save(
        Request $request,
        EntityManagerInterface $entityManager,
        IntervalRepository $intervalRepository,
        DayRepository $dayRepository
    ): Response
    {
        $reservation = new Reservation();
        $reservation->setDay($dayRepository->find($request->request->get('day_id')));
        $reservation->setFullName($request->request->get('name'));
        $reservation->setNote($request->request->get('note'));
        $reservation->setPhone($request->request->get('phone'));
        $reservation->setTimeInterval($intervalRepository->find($request->request->get('interval_id')));
        $entityManager->persist($reservation);
        $entityManager->flush();

        return $this->json('ok');
    }
}
