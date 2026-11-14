-- Renaissance — Étape 1, point 6 : contenu initial des zones SEO locales.
--
-- Migration NON destructive : insertion uniquement, idempotente (ON CONFLICT).
-- Les textes sont éditoriaux et différenciés par zone. Ils n'affirment AUCUN
-- fait non fourni par le client : ni dates, ni tarifs, ni lieux, ni partenariat.
-- Les FAQ restent vides : les réponses engageraient l'organisme.
--
-- La 5e zone est laissée libre, à confirmer au cadrage.

insert into payload.zones_seo (nom, slug, titre_h1, introduction, seo_titre, seo_description)
values
  (
    'Yonne',
    'yonne',
    'Se former aux métiers de l''accompagnement dans l''Yonne',
    'L''Yonne est un département où la demande d''accompagnement des personnes âgées et des publics fragiles est bien réelle, et où les vocations manquent souvent d''un cadre pour s''exprimer. Renaissance y propose des parcours de formation aux métiers de l''accueil familial, de l''animation et de la présence au quotidien. Si vous habitez dans l''Yonne et que vous envisagez une reconversion ou une première qualification dans ces métiers, cette page réunit les parcours proposés et les étapes pour nous contacter.',
    'Formation accueil familial et accompagnement dans l''Yonne (89) | Renaissance',
    'Formations aux métiers de l''accompagnement dans l''Yonne : accueil familial, animation et vie sociale, dame de compagnie. Parcours et préinscription.'
  ),
  (
    'Joigny',
    'joigny',
    'Formations aux métiers de l''accompagnement à Joigny',
    'Vous vivez à Joigny ou dans ses environs et vous vous interrogez sur une reconversion vers les métiers du soin et du lien ? Ces métiers s''apprennent : ils demandent une posture, des repères et des gestes professionnels. Renaissance forme aux parcours d''accueil familial, d''animation et de vie sociale, et de présence auprès des personnes âgées. Cette page vous présente ces parcours et la marche à suivre pour construire votre projet avec nous.',
    'Formation accueil familial et accompagnement à Joigny (89) | Renaissance',
    'Formations aux métiers de l''accompagnement à Joigny : accueil familial, animation et vie sociale, dame de compagnie. Parcours et préinscription.'
  ),
  (
    'Sens',
    'sens',
    'Formations aux métiers de l''accompagnement à Sens',
    'Sens est la ville la plus peuplée de l''Yonne, et les besoins d''accompagnement y suivent la même courbe qu''ailleurs : vieillissement, isolement, maintien à domicile. Pour qui veut faire de son attention aux autres un métier, la question est celle de la formation. Renaissance propose trois parcours aux habitants de Sens et de son agglomération : accueil familial, animation et vie sociale, présence au quotidien. Vous trouverez ici leur contenu et les étapes pour candidater.',
    'Formation accueil familial et accompagnement à Sens (89) | Renaissance',
    'Formations aux métiers de l''accompagnement à Sens : accueil familial, animation et vie sociale, dame de compagnie. Parcours et préinscription.'
  ),
  (
    'Auxerre',
    'auxerre',
    'Formations aux métiers de l''accompagnement à Auxerre',
    'Préfecture de l''Yonne, Auxerre concentre une part importante des structures médico-sociales du département. Beaucoup de personnes y exercent déjà auprès des publics fragiles sans avoir eu l''occasion de formaliser leurs compétences ; d''autres souhaitent changer de voie. Renaissance s''adresse aux deux. Cette page détaille les parcours proposés aux habitants d''Auxerre et de son bassin, ainsi que les étapes pour échanger avec nous sur votre projet.',
    'Formation accueil familial et accompagnement à Auxerre (89) | Renaissance',
    'Formations aux métiers de l''accompagnement à Auxerre : accueil familial, animation et vie sociale, dame de compagnie. Parcours et préinscription.'
  )
on conflict (slug) do nothing;
