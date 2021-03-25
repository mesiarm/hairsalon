<?php


namespace App\Controller;


use App\Repository\IntervalRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class IntervalsController extends AbstractController
{
    /**
     * @Route ("/intervals", name="intervals", methods={"GET"})
     */
    public function index(IntervalRepository $repository): JsonResponse
    {
        return $this->json($repository->findAll());
    }
}