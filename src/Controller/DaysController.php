<?php

namespace App\Controller;

use App\Repository\DayRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DaysController extends AbstractController
{
    /**
     * @Route ("/days", name="days", methods={"GET"})
     */
    public function index(DayRepository $repository): Response
    {
        return $this->json($repository->findAll());
    }
}
